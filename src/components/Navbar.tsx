import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { ShimmerButton } from './ui/shimmer-button';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  {
    name: 'Experience',
    href: '#experience',
  },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = document.querySelectorAll('section[id]');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id') || '';
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Ankur_Shrivastava_resume.pdf';
    link.download = 'Ankur_Shrivastava_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // FIX: Wrap the component in a React Fragment (<>) to return two sibling elements.
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-md py-3' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <a
              href="#home"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Ankur<span className="text-primary">.Shrivastava</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </a>
              ))}

              <div className="ml-4 flex items-center space-x-3">
                <ThemeToggle />
                <ShimmerButton
                  onClick={downloadResume}
                  className="bg-primary text-primary-foreground font-medium"
                  shimmerColor="var(--primary)"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </ShimmerButton>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 md:hidden">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md bg-secondary"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>

          {/* FIX: The mobile navigation menu has been MOVED from here... */}
        </div>
      </header>
      {/* End of header */}

      {/* FIX: ...to here, outside the header, as a sibling element. */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col items-center justify-center`}
      >
        <div className="absolute top-5 right-5">
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              {link.name}
            </a>
          ))}
          <ShimmerButton
            onClick={() => {
              downloadResume();
              closeMobileMenu();
            }}
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </ShimmerButton>
        </div>
      </div>
    </>
  );
};

export default Navbar;
