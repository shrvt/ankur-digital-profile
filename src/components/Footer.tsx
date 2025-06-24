import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="font-bold text-xl">
              Ankur<span className="text-primary">.Shrivastava</span>
            </p>
            <p className="text-muted-foreground mt-2">
              Senior Software Engineer | AEM Specialist & AI Explorer
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href="https://linkedin.com/in/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            <a
              href="mailto:contact@yourdomain.placeholder"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Ankur Shrivastava. All rights reserved.
          </div>

          <div className="mt-4 md:mt-0">
            <nav className="flex space-x-4 text-sm">
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-primary transition-colors">
                About
              </a>
              <a
                href="#experience"
                className="hover:text-primary transition-colors"
              >
                Experience
              </a>
              <a
                href="#skills"
                className="hover:text-primary transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
