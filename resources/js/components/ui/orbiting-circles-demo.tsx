import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Icons } from "@/components/icons";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[420px] w-full items-center justify-center overflow-visible">
      {/* Orbit Borders */}
      <div className="absolute w-[360px] h-[360px] rounded-full border border-gray-300 dark:border-gray-600" />
      <div className="absolute w-[240px] h-[240px] rounded-full border border-gray-300 dark:border-gray-600" />

      {/* Outer Orbit (radius = 180 → matches 360px border) */}
      <OrbitingCircles iconSize={40} radius={180} speed={35} reverse>
        <Icons.user />
        <Icons.user />
        <Icons.user />
        <Icons.user />
        <Icons.user />
        <Icons.user />
      </OrbitingCircles>

      {/* Inner Orbit (radius = 120 → matches 240px border) */}
      <OrbitingCircles iconSize={40} radius={120} speed={25}>
        <Icons.user />
        <Icons.user />
        <Icons.user />
        <Icons.user />
        <Icons.user />
        <Icons.user />                        
      </OrbitingCircles>

      {/* Center element */}
      <div className="w-20 h-20 rounded-full bg-[var(--color-cocollab)] flex items-center justify-center text-white font-bold shadow-lg">
        Cocollab
      </div>
    </div>
  );
}
