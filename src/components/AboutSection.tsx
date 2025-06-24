import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-background py-16">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <div
            className={`col-span-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '200ms' }}
          >
            <p className="text-lg mb-6">
              With over 8 years of experience in the software industry, I've
              specialized in AEM development, backend engineering with Java, and
              Adobe Experience Cloud. My journey has evolved from technical
              implementation to architecture design and team leadership, with a
              focus on delivering scalable enterprise solutions.
            </p>
            <p className="text-lg mb-6">
              Throughout my career at organizations like TRACK GmbH, Virtusa,
              Publicis Sapient, and Cognizant, I've helped clients achieve
              digital transformation through innovative solutions and technical
              excellence. I'm particularly passionate about creating
              high-performance, maintainable codebases that solve complex
              business challenges.
            </p>
            <p className="text-lg">
              Currently, I'm exploring the exciting intersection of Agentic AI
              and Automation, leveraging tools like n8n, Ollama, and LangChain
              to build intelligent workflows and applications. I believe these
              technologies represent the future of software development, and I'm
              committed to staying at the forefront of this rapidly evolving
              field.
            </p>
          </div>

          <div
            className={`bg-card p-6 rounded-lg border border-border shadow-lg ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
            style={{ animationDelay: '400ms' }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Professional Highlights
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary p-1 rounded mr-3 mt-0.5">
                  ✓
                </span>
                <span>AEM Specialist with extensive backend expertise</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary p-1 rounded mr-3 mt-0.5">
                  ✓
                </span>
                <span>Java developer with extensive enterprise experience</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary p-1 rounded mr-3 mt-0.5">
                  ✓
                </span>
                <span>Expert in Adobe Experience Cloud solutions</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary p-1 rounded mr-3 mt-0.5">
                  ✓
                </span>
                <span>Technical lead managing cross-functional teams</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary p-1 rounded mr-3 mt-0.5">
                  ✓
                </span>
                <span>AI enthusiast exploring automation solutions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
