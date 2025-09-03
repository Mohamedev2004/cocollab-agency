import {
  UserPlus,
  Users,
  Zap,
  Gift,
  Star,
  Trophy,
} from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface InfluencerJourneyProps {
  heading?: string;
  steps?: Step[];
}

const InfluencerJourney = ({
  heading = "Your Influencer Journey",
  steps = [
    {
      title: "1. Set up your profile",
      description:
        "Complete your influencer profile to start earning points and tracking your growth.",
      icon: <UserPlus className="size-6" />,
    },
    {
      title: "2. Grow your audience",
      description:
        "Post content and interact with your followers to expand your reach and influence.",
      icon: <Users className="size-6" />,
    },
    {
      title: "3. Collect points",
      description:
        "Earn points through activities like posting, engaging, and completing challenges.",
      icon: <Zap className="size-6" />,
    },
    {
      title: "4. Unlock rewards",
      description:
        "Redeem your points for rewards, bonuses, and exciting opportunities.",
      icon: <Gift className="size-6" />,
    },
    {
      title: "5. Exclusive collaborations",
      description:
        "Get invited to premium brand collaborations based on your influence score.",
      icon: <Star className="size-6" />,
    },
    {
      title: "6. Showcase achievements",
      description:
        "Highlight your milestones and successful partnerships to attract more brands.",
      icon: <Trophy className="size-6" />,
    },
  ],
}: InfluencerJourneyProps) => {
  return (
    <section className="py-20 bg-white rounded-2xl mt-4">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-4xl font-title font-medium mb-4 text-[var(--color-cocollab)]">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to grow your influence, earn rewards, and unlock collaborations.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl shadow-md border border-gray-100 p-6 transition-transform hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "var(--color-cocollab)" }}
            >
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-white text-[var(--color-cocollab)] shadow-md">
                {step.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-white">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfluencerJourney;
