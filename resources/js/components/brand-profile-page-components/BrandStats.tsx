"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
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

const BrandStats: React.FC = () => {
  // Animate on mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100); // delay for smooth entry
  }, []);

  // Chart data for platforms
  const platformData = mounted
    ? [
        { platform: "Instagram", value: 60, fill: "var(--chart-1)" },
        { platform: "TikTok", value: 20, fill: "var(--chart-2)" },
        { platform: "YouTube", value: 20, fill: "var(--chart-3)" },
      ]
    : [
        { platform: "Instagram", value: 0, fill: "var(--chart-1)" },
        { platform: "TikTok", value: 0, fill: "var(--chart-2)" },
        { platform: "YouTube", value: 0, fill: "var(--chart-3)" },
      ];

  // Chart data for niches
  const nicheData = mounted
    ? [
        { niche: "Fashion", value: 40, fill: "var(--chart-1)" },
        { niche: "Tech", value: 25, fill: "var(--chart-2)" },
        { niche: "Food", value: 20, fill: "var(--chart-3)" },
        { niche: "Fitness", value: 15, fill: "var(--chart-4)" },
      ]
    : [
        { niche: "Fashion", value: 0, fill: "var(--chart-1)" },
        { niche: "Tech", value: 0, fill: "var(--chart-2)" },
        { niche: "Food", value: 0, fill: "var(--chart-3)" },
        { niche: "Fitness", value: 0, fill: "var(--chart-4)" },
      ];

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Platforms Pie Chart */}
        <Card className="bg-white border-none">
          <CardHeader className="items-center pb-0">
            <CardTitle>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-[var(--color-cocollab)] font-semibold shadow-sm">
                Collaboration Platforms
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
                        <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-md border-none text-black">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: data.fill }}
                          />
                          <span className="text-sm font-medium">
                            {data.platform}: {data.value}%
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
                  isAnimationActive={true}
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
                              className="text-lg font-bold text-black"
                            >
                            Platforms
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-muted-foreground text-sm"
                            >
                              Stats
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
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium text-black">
              Trending up by 4.8% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground text-center leading-none">
              Showing distribution of collaboration platforms
            </div>
          </CardFooter>
        </Card>

        {/* Niches Horizontal Bar Chart */}
        <Card className="bg-white border-none">
          <CardHeader>
            <CardTitle>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-[var(--color-cocollab)] font-semibold shadow-sm">
                Top Niches Collaborated With
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <ChartContainer
              config={{
                fashion: { label: "Fashion", color: "var(--chart-1)" },
                tech: { label: "Tech", color: "var(--chart-2)" },
                food: { label: "Food", color: "var(--chart-3)" },
                fitness: { label: "Fitness", color: "var(--chart-4)" },
              }}
              className="w-full h-[250px]"
            >
                <BarChart
                  data={nicheData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis dataKey="niche" type="category" tickLine={false} />
                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-xl bg-white px-3 py-2 shadow-md border-none text-black">
                            <p className="text-sm font-medium">
                              {data.niche}: {data.value}%
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
                    isAnimationActive={true}
                    animationBegin={200}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {nicheData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="text-sm text-black font-medium text-center m-auto">
            Shows industry focus of collaborations
          </CardFooter>
        </Card>
      </div>
  );
};

export default BrandStats;
