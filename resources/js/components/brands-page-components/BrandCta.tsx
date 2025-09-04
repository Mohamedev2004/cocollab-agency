import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BrandCtaProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "Access top influencers",
  "Boost your brand visibility",
  "Custom campaign strategies",
  "Data-driven insights",
  "24/7 brand support",
];

const BrandCta = ({
  title = "Become a Cocollab Brand",
  description = "Join Cocollab and connect with the right influencers to grow your brand, amplify your reach, and create impactful campaigns.",
  buttonText = "Join as a Brand",
  buttonUrl = "#",
  items = defaultItems,
}: BrandCtaProps) => {
  return (
    <section className="mt-4">
      <div className="mx-auto">
        <div className="flex justify-center">
          <div className="w-full">
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-[#8F8EEB] px-6 py-10 text-white md:flex-row lg:px-20 lg:py-16 shadow-lg">
              {/* Left Content */}
              <div className="md:w-1/2">
                <h4 className="mb-2 text-3xl font-bold md:text-4xl">{title}</h4>
                <p className="opacity-90">{description}</p>
                <Button
                  className="mt-6 bg-white text-[var(--color-cocollab)] hover:bg-white/80"
                  asChild
                >
                  <a href={buttonUrl}>
                    {buttonText} <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>

              {/* Right List */}
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-3 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <Check className="mr-3 size-5 flex-shrink-0 text-white" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { BrandCta };
