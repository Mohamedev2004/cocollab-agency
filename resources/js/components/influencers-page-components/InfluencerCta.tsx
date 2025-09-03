import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { route } from "ziggy-js";

interface InfluencerCtaProps {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const InfluencerCta = ({
  heading = "Become a Cocollab Influencer",
  description = "Join our community of creators and start earning rewards, collaborating with top brands, and growing your influence today!",
  buttons = {
    primary: {
      text: "Sign Up Now",
      url: route('register'),
    },
    secondary: {
      text: "Learn More",
      url: "/about-influencers",
    },
  },
}: InfluencerCtaProps) => {
  return (
    <section className="mt-4">
      <div className="w-full">
        <div
          className="rounded-lg p-8 md:rounded-xl lg:p-12"
          style={{ backgroundColor: "var(--color-cocollab)" }}
        >
          <div className="m-auto">
            <h3 className="mb-4 text-3xl font-light text-white text-center font-title md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="text-white mb-8 text-lg font-medium text-center lg:text-xl">
              {description}
            </p>
            <div className="flex justify-center flex-col gap-3 sm:flex-row sm:gap-4">
              {buttons.primary && (
                <Button size="lg" className="w-full sm:w-auto" asChild>
                    <a href={buttons.primary.url} className="flex items-center gap-2">
                        {buttons.primary.text} <ArrowRight />
                    </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerCta;
