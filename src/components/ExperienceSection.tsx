import { useEffect, useRef, useState } from 'react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'TRACK GmbH',
    role: 'Technical Lead / Senior Software Developer',
    period: '2021 - Present',
    location: 'Hamburg, Germany',
    description:
      'Leading development teams in implementing enterprise AEM solutions, architecting scalable backend systems, and mentoring junior developers. Driving technical innovation and best practices across projects.',
  },
  {
    company: 'Virtusa',
    role: 'Senior Software Engineer',
    period: '2018 - 2021',
    location: 'Remote',
    description:
      'Developed complex AEM components and templates, implemented RESTful APIs for backend integration, and optimized application performance for large-scale deployments.',
  },
  {
    company: 'Publicis Sapient',
    role: 'Software Engineer',
    period: '2016 - 2018',
    location: 'Bangalore, India',
    description:
      'Built and maintained AEM-based solutions for enterprise clients, collaborated with UX/UI teams to implement pixel-perfect designs, and participated in agile development processes.',
  },
  {
    company: 'Cognizant',
    role: 'Associate Software Engineer',
    period: '2014 - 2016',
    location: 'Pune, India',
    description:
      'Started career in Java development, progressively taking on AEM implementation work. Contributed to backend service development, testing, and documentation.',
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0',
              10
            );
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Experience</h2>

        <div className="mt-12 relative">
          {/* Timeline */}
          <div className="mt-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                data-index={index}
                className={`timeline-item ${visibleItems.includes(index) ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-2">
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                  <div className="text-lg font-medium text-primary">
                    {exp.role}
                  </div>
                  <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground mt-1">
                    <span>{exp.period}</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
                <p className="text-foreground/80 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
