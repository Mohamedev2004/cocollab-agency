"use client";

import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import {
  PieChart,
  Pie,
  Label,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const InfluencerStats: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 150);
  }, []);

  // Audience platforms distribution
  const platformData = mounted
    ? [
        { platform: "Instagram", value: 12000, fill: "var(--chart-1)" },
        { platform: "TikTok", value: 85000, fill: "var(--chart-2)" },
        { platform: "YouTube", value: 40000, fill: "var(--chart-3)" },
      ]
    : [
        { platform: "Instagram", value: 0, fill: "var(--chart-1)" },
        { platform: "TikTok", value: 0, fill: "var(--chart-2)" },
        { platform: "YouTube", value: 0, fill: "var(--chart-3)" },
      ];

  // Audience demographics (age groups for example)
  const demoData = mounted
    ? [
        { group: "18-24", value: 45, fill: "var(--chart-1)" },
        { group: "25-34", value: 30, fill: "var(--chart-2)" },
        { group: "35-44", value: 15, fill: "var(--chart-3)" },
        { group: "45+", value: 10, fill: "var(--chart-4)" },
      ]
    : [
        { group: "18-24", value: 0, fill: "var(--chart-1)" },
        { group: "25-34", value: 0, fill: "var(--chart-2)" },
        { group: "35-44", value: 0, fill: "var(--chart-3)" },
        { group: "45+", value: 0, fill: "var(--chart-4)" },
      ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Audience Platforms Pie Chart */}
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-purple-100 text-[var(--color-cocollab)] font-semibold shadow-sm">
              Audience Platforms
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={{
              instagram: { label: "Instagram", color: "var(--chart-1)" },
              tiktok: { label: "TikTok", color: "var(--chart-2)" },
              youtube: { label: "YouTube", color: "var(--chart-3)" },
            }}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-md border">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: data.fill }}
                        />
                        <span className="text-sm font-medium">
                          {data.platform}: {data.value} followers
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={platformData}
                dataKey="value"
                nameKey="platform"
                innerRadius={60}
                strokeWidth={5}
                isAnimationActive
                animationBegin={200}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-lg font-bold"
                          >
                            Followers
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-muted-foreground text-sm"
                          >
                            by Platform
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm text-center">
          <div className="flex items-center gap-2 font-medium">
            <Users className="h-4 w-4" /> Total reach expanding steadily
          </div>
          <div className="text-muted-foreground">
            Distribution of followers across platforms
          </div>
        </CardFooter>
      </Card>

      {/* Audience Demographics Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-purple-100 text-[var(--color-cocollab)] font-semibold shadow-sm">
              Audience Demographics
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <ChartContainer
            config={{
              "18-24": { label: "18-24", color: "var(--chart-1)" },
              "25-34": { label: "25-34", color: "var(--chart-2)" },
              "35-44": { label: "35-44", color: "var(--chart-3)" },
              "45+": { label: "45+", color: "var(--chart-4)" },
            }}
            className="w-full h-[250px]"
          >
              <BarChart
                data={demoData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis dataKey="group" type="category" tickLine={false} />
                <ChartTooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl bg-white px-3 py-2 shadow-md border">
                          <p className="text-sm font-medium">
                            {data.group}: {data.value}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 4, 4]}
                  isAnimationActive
                  animationBegin={200}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {demoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-sm text-black font-medium text-center m-auto">
          Breakdown of audience by age group
        </CardFooter>
      </Card>
    </div>
  );
};

export default InfluencerStats;
