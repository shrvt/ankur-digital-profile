import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'AI Agent for Content Management',
    description:
      'Built an AI-powered agent that automates content tagging, summarization, and categorization using n8n workflows and custom LLM integrations.',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['n8n', 'Supabase', 'LLM', 'Node.js'],
    github: 'https://github.com/placeholder',
  },
  {
    title: 'Local LLM Experimentation Platform',
    description:
      'Developed a platform for testing and comparing various local LLMs using Ollama, with a focus on performance optimization and prompt engineering.',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['Ollama', 'React', 'LangChain', 'Python'],
    github: 'https://github.com/placeholder',
    demo: 'https://demo.placeholder.com',
  },
  {
    title: 'AEM Component Library',
    description:
      'Created a reusable library of optimized AEM components with comprehensive documentation and automated testing.',
    image:
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    technologies: ['AEM', 'Java', 'HTL', 'JavaScript'],
    github: 'https://github.com/placeholder',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0',
              10
            );
            setVisibleProjects((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      projectCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Projects & AI Explorations</h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-index={index}
              className={`project-card ${
                visibleProjects.includes(index)
                  ? 'animate-fade-in'
                  : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      View Source
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center hover:text-primary transition-colors"
                    >
                      <span>Live Demo</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card hover:bg-card/80 border border-border px-6 py-3 rounded-full transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
