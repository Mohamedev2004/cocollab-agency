interface PressHeroProps {
  heading?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
}

const PressHero = ({
  heading = "The Art of Inspiring the Media",
  description = "Targeted strategy, impactful storytelling, and a ready-to-go media network: we connect your brand with the right voices for press influence that truly matters. Ideal for: product launches, brand storytelling, reputation management, or strengthening your industry presence.",
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Press relations hero image showing media strategy",
  },
}: PressHeroProps) => {
  return (
    <section className="bg-white sm:py-22 py-10 px-4 rounded-2xl">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left side content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty font-title text-black text-4xl font-light lg:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <button className="flex items-center justify-center px-6 py-2.5 bg-[var(--color-cocollab)] text-white font-semibold rounded-xl shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:opacity-90" style={{ boxShadow: '0 10px 15px -3px #40377844, 0 4px 6px -4px #40377833' }}>
                    Consult Us
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </button>
            </div>
          </div>

          {/* Right side image */}
          {image && (
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-126 w-full rounded-md object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PressHero;
