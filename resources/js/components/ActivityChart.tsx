/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

interface ActivityData {
  date: string;
  count: number;
}

type ActivityChartProps = {
  userId: number;
  userName: string;
  role: "influencer" | "brand";
};

// ✅ Fix timezone issue: format date as YYYY-MM-DD in local time
function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function ActivityChart({
  userId,
  role,
  userName,
}: ActivityChartProps) {
  const [data, setData] = useState<ActivityData[]>([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalContributions = useMemo(() => {
    return data.reduce((sum, d) => sum + d.count, 0);
  }, [data]);

  useEffect(() => {
    const fetchYearsAndData = async () => {
      setIsLoading(true);
      try {
        const yearsEndpoint =
          role === "influencer"
            ? `/influencer/dashboard/users/${userId}/years`
            : `/brand/dashboard/users/${userId}/years`;

        const yearsRes = await axios.get(yearsEndpoint);
        const fetchedYears = yearsRes.data;

        setAvailableYears(fetchedYears);

        const initialYear =
          fetchedYears.length > 0 ? fetchedYears[0] : new Date().getFullYear();
        setYear(initialYear.toString());

        const activityEndpoint =
          role === "influencer"
            ? `/influencer/dashboard/users/${userId}/activity`
            : `/brand/dashboard/users/${userId}/activity`;

        const activityRes = await axios.get(activityEndpoint, {
          params: { year: initialYear },
        });

        const formatted = Object.entries(activityRes.data).map(
          ([date, count]) => ({
            date,
            count: count as number,
          })
        );
        setData(formatted);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setAvailableYears([new Date().getFullYear()]);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchYearsAndData();
  }, [userId, role]);

  useEffect(() => {
    if (year && !isLoading) {
      const fetchActivity = async () => {
        try {
          const endpoint =
            role === "influencer"
              ? `/influencer/dashboard/users/${userId}/activity`
              : `/brand/dashboard/users/${userId}/activity`;
          const res = await axios.get(endpoint, { params: { year } });
          const formatted = Object.entries(res.data).map(([date, count]) => ({
            date,
            count: count as number,
          }));
          setData(formatted);
        } catch (err) {
          console.error("Failed to fetch activity data for year:", year, err);
          setData([]);
        }
      };
      fetchActivity();
    }
  }, [year, userId, role, isLoading]);

  const dateToCountMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((d) => map.set(d.date, d.count));
    return map;
  }, [data]);

  const classForValue = (count: number) => {
    if (count === 0) return "bg-gray-200 dark:bg-[#3d3d3d]";
    if (count === 1) return "bg-purple-300 dark:bg-purple-300";
    if (count === 2) return "bg-purple-500 dark:bg-purple-500";
    return "bg-purple-700 dark:bg-purple-700";
  };

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Build months with aligned weeks
  const monthlyDates = useMemo(() => {
    const monthsData: { month: string; weeks: (string | null)[][] }[] = [];

    for (let m = 0; m < 12; m++) {
      const monthStart = new Date(parseInt(year), m, 1);
      const monthEnd = new Date(parseInt(year), m + 1, 0);

      const monthWeeks: (string | null)[][] = [];
      let week: (string | null)[] = [];

      // Monday = 0 … Sunday = 6
      let dayOfWeek = (monthStart.getDay() + 6) % 7;

      // pad before first day of the month
      for (let i = 0; i < dayOfWeek; i++) week.push(null);

      const current = new Date(monthStart);
      while (current <= monthEnd) {
        week.push(formatDateLocal(current)); // ✅ use local date

        dayOfWeek = (dayOfWeek + 1) % 7;
        if (dayOfWeek === 0) {
          monthWeeks.push(week);
          week = [];
        }

        current.setDate(current.getDate() + 1);
      }

      if (week.length) {
        while (week.length < 7) week.push(null);
        monthWeeks.push(week);
      }

      monthsData.push({ month: months[m], weeks: monthWeeks });
    }

    return monthsData;
  }, [year, months]);

  return (
  <div className="w-full h-full rounded-xl shadow-lg font-sans p-0 flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-start mb-2 p-4">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {userName}'s Activity
        </h2>
        <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          Total Contributions:{" "}
          <span className="font-semibold">{totalContributions}</span>
        </div>
      </div>

      {availableYears.length > 1 && (
        <Select
          value={year}
          onValueChange={(val) => setYear(val)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>


    {isLoading ? (
      <div className="flex justify-center items-center flex-1">
        <ScaleLoader color="#5B21B6" />
      </div>
    ) : (
      <div className="flex-1 overflow-auto hide-scrollbar p-4">
        <div className="flex flex-row space-x-6 min-w-fit h-full">
          {/* Weekday labels */}
          <div className="flex flex-col text-xs text-gray-500 dark:text-gray-300 mt-6 space-y-1 flex-shrink-0">
            {weekdays.map((day, idx) => (
              <span key={idx}>{day}</span>
            ))}
          </div>

          <TooltipProvider>
            <div className="flex flex-row h-full">
              {monthlyDates.map(({ month, weeks }) => (
                <div key={month} className="flex flex-col mr-6 h-full">
                  <div className="text-center mb-2 text-xs text-gray-500 dark:text-gray-300">
                    {month}
                  </div>
                  <div className="flex flex-row h-full">
                    {weeks.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        className="flex flex-col gap-1 mr-1 flex-1"
                      >
                        {week.map((date, idx) => {
                          if (!date)
                            return (
                              <div key={idx} className="w-4 h-4 flex-1" />
                            );
                          const count = dateToCountMap.get(date) || 0;
                          return (
                            <Tooltip key={date}>
                              <TooltipTrigger asChild>
                                <div
                                  className={`w-4 h-4 flex-1 rounded-sm transition-all duration-200 cursor-pointer ${classForValue(
                                    count
                                  )} hover:scale-110`}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{`${count} logins on ${date}`}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>
    )}

    {/* Legend */}
    <div className="flex justify-end items-center mt-2 text-sm text-gray-500 dark:text-gray-400 p-4">
      <span className="mr-2">Less</span>
      <div className="w-3 h-3 bg-gray-200 dark:bg-[#3d3d3d] rounded-sm"></div>
      <div className="w-3 h-3 bg-purple-300 dark:bg-purple-300 rounded-sm ml-1"></div>
      <div className="w-3 h-3 bg-purple-500 dark:bg-purple-500 rounded-sm ml-1"></div>
      <div className="w-3 h-3 bg-purple-700 dark:bg-purple-700 rounded-sm ml-1"></div>
      <span className="ml-2">More</span>
    </div>
  </div>
);
}
