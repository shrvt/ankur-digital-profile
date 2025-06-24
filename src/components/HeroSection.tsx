import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background with more masculine gradients */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-background"></div>
        <div className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%] animate-slow-spin">
          {/* Masculinized gradient circles */}
          <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-slate-800/30 to-zinc-700/30 dark:from-slate-600/40 dark:to-zinc-500/40 blur-3xl"></div>
          <div className="absolute top-[30%] left-[50%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-stone-800/30 to-neutral-700/30 dark:from-stone-600/40 dark:to-neutral-500/40 blur-3xl"></div>
          <div className="absolute top-[60%] left-[30%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-gray-800/30 to-zinc-700/30 dark:from-gray-600/40 dark:to-zinc-500/40 blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-background/40 dark:bg-background/60 backdrop-blur-sm"></div>
      </div>

      <div className="section-container relative z-10">
        <div
          className={`flex-1 text-center transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            <span className="block mb-2 bg-gradient-to-r from-slate-800 to-neutral-600 dark:from-slate-300 dark:to-neutral-400 bg-clip-text text-transparent animate-text-shimmer">
              Ankur Shrivastava
            </span>
            <span
              className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 block animate-fade-in"
              style={{ animationDelay: '300ms' }}
            >
              Senior Software Engineer
            </span>
          </h1>

          <h2
            className="text-lg md:text-xl font-medium mb-8 text-foreground/80 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '600ms' }}
          >
            AEM Specialist & AI Explorer | Crafting enterprise digital
            experiences and pioneering AI-driven automation
          </h2>

          <div
            className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in"
            style={{ animationDelay: '900ms' }}
          >
            <ShimmerButton
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              shimmerColor="#888888"
              onClick={() =>
                window.open('/Ankur_Shrivastava_resume.pdf', '_blank')
              }
            >
              Download Resume
            </ShimmerButton>

            <a
              href="#contact"
              className="px-6 py-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center text-sm text-foreground/80 hover:text-foreground transition-colors"
      >
        <span className="mb-2">Scroll Down</span>
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  );
};

export default HeroSection;
