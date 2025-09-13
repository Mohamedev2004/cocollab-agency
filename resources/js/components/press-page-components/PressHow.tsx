import { Lightbulb, ListChecks, MessageCircleMore } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PressHow = () => {
  return (
    <section className="sm:py-22 py-10 bg-white rounded-2xl mt-4">
      <div className="container mx-auto">
        <div className="w-full p-4">

          <Tabs defaultValue="feature-1" className="w-full">
            <TabsList className="flex h-auto w-full flex-col gap-2 bg-background md:flex-row">
              <TabsTrigger
                value="feature-1"
                className="flex w-full flex-col items-start justify-start gap-1 rounded-md border p-4 text-left whitespace-normal text-primary hover:border-primary/40 data-[state=active]:border-primary"
              >
                <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                    <MessageCircleMore className="size-4 text-primary" />
                  </span>
                  <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                    Target the Right Audience
                  </p>
                </div>
                <p className="font-normal text-muted-foreground md:block">
                  Reach traditional or digital media that matter to your brand.
                </p>
              </TabsTrigger>

              <TabsTrigger
                value="feature-2"
                className="flex w-full flex-col items-start justify-start gap-1 rounded-md border p-4 text-left whitespace-normal text-primary hover:border-primary/40 data-[state=active]:border-primary"
              >
                <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                    <Lightbulb className="size-4 text-primary" />
                  </span>
                  <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                    Collaborate on Your Narrative
                  </p>
                </div>
                <p className="font-normal text-muted-foreground md:block">
                  Work directly with partners to shape your story.
                </p>
              </TabsTrigger>

              <TabsTrigger
                value="feature-3"
                className="flex w-full flex-col items-start justify-start gap-1 rounded-md border p-4 text-left whitespace-normal text-primary hover:border-primary/40 data-[state=active]:border-primary"
              >
                <div className="flex items-center gap-2 md:flex-col md:items-start lg:gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                    <ListChecks className="size-4 text-primary" />
                  </span>
                  <p className="text-lg font-semibold md:text-2xl lg:text-xl">
                    Amplify Your Presence
                  </p>
                </div>
                <p className="font-normal text-muted-foreground md:block">
                  Boost visibility with content shared by trusted voices.
                </p>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feature-1">
              <img
                loading="lazy"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="Target the right audience"
                className="aspect-video w-full h-150 rounded-md object-cover"
              />
            </TabsContent>
            <TabsContent value="feature-2">
              <img
                loading="lazy"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="Collaborate on your narrative"
                className="aspect-video w-full h-150 rounded-md object-cover"
              />
            </TabsContent>
            <TabsContent value="feature-3">
              <img
                loading="lazy"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="Amplify your presence"
                className="aspect-video w-full h-150 rounded-md object-cover"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PressHow;
