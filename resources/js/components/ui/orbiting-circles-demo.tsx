import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Icons } from "@/components/icons";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-auto w-full items-center justify-center">
  <div className="relative flex items-center justify-center" style={{ height: 350, minHeight: 350 }}>
    {/* Orbit Borders */}
    <div className="absolute w-[300px] h-[300px] rounded-full border border-gray-300 dark:border-gray-600" />
    <div className="absolute w-[200px] h-[200px] rounded-full border border-gray-300 dark:border-gray-600" />

    {/* Orbits */}
    <OrbitingCircles iconSize={40} radius={150} speed={35} reverse>
      <Icons.user />
      <Icons.user />
      <Icons.user />
      <Icons.user />
    </OrbitingCircles>

    <OrbitingCircles iconSize={40} radius={100} speed={25}>
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
</div>

  );
}