import { useEffect, useRef, useState } from 'react';
import { Briefcase, Code, Database, User } from 'lucide-react';

interface SkillCategory {
  name: string;
  icon: typeof Code;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 1-5
}

const skillCategories: SkillCategory[] = [
  {
    name: 'AEM & Adobe Experience Cloud',
    icon: Briefcase,
    skills: [
      { name: 'AEM 6.x/Cloud', level: 5 },
      { name: 'Adobe Analytics', level: 4 },
      {
        name: 'Adobe Target',
        level: 4,
      },
      { name: 'Adobe Campaign', level: 3 },
      { name: 'Adobe Launch', level: 4 },
    ],
  },
  {
    name: 'Backend & Development',
    icon: Code,
    skills: [
      { name: 'Java', level: 5 },
      { name: 'Spring Boot', level: 4 },
      { name: 'REST APIs', level: 5 },
      {
        name: 'GraphQL',
        level: 3,
      },
      { name: 'Microservices', level: 4 },
    ],
  },
  {
    name: 'DevOps & Infrastructure',
    icon: Database,
    skills: [
      { name: 'Docker', level: 4 },
      { name: 'CI/CD', level: 4 },
      {
        name: 'Cloud Platforms',
        level: 3,
      },
      { name: 'Jenkins', level: 4 },
      { name: 'Git', level: 5 },
    ],
  },
  {
    name: 'AI & Automation',
    icon: User,
    skills: [
      { name: 'n8n', level: 3 },
      { name: 'Ollama', level: 3 },
      {
        name: 'LangChain',
        level: 2,
      },
      { name: 'LLM Integration', level: 3 },
      { name: 'Prompt Engineering', level: 4 },
    ],
  },
];

const SkillsSection = () => {
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
      { threshold: 0.1 }
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
    <section id="skills" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Skills & Expertise</h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={`bg-card rounded-lg border border-border p-6 hover:shadow-md transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-primary/10 mr-4">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <span
                              key={i}
                              className={`inline-block w-2 h-2 rounded-full mx-0.5 ${i < skill.level ? 'bg-primary' : 'bg-muted'}`}
                            />
                          ))}
                      </span>
                    </div>
                    <div className="skill-progress dark:bg-muted bg-muted">
                      <div
                        className="h-full dark:bg-primary bg-primary transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level * 20}%` : '0%',
                          transitionDelay: `${categoryIndex * 100 + 300}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
