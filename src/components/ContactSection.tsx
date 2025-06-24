import { useEffect, useRef, useState } from 'react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would be an actual form submission
      // This is just a placeholder for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadResume = () => {
    // This is a placeholder - Ankur will replace with actual resume file
    const link = document.createElement('a');
    link.href = '/Ankur_Shrivastava_resume.pdf';
    link.download = 'Ankur_Shrivastava_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            className={isVisible ? 'animate-fade-in' : 'opacity-0'}
            style={{ animationDelay: '200ms' }}
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Me</h3>

            <p className="mb-8 text-lg">
              Have a question or want to work together? Feel free to reach out
              through the form or contact me directly through any of the
              channels below.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:contact@mydomain.de"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>contact@mydomain.de</span>
              </a>

              <a
                href="https://linkedin.com/in/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
            </div>

            <button onClick={downloadResume} className="resume-button">
              Download Resume
            </button>
          </div>

          <div
            className={isVisible ? 'animate-fade-in' : 'opacity-0'}
            style={{ animationDelay: '400ms' }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card p-6 rounded-lg border border-border"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md bg-secondary border ${errors.name ? 'border-destructive' : 'border-border'}`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md bg-secondary border ${errors.email ? 'border-destructive' : 'border-border'}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md bg-secondary border ${errors.message ? 'border-destructive' : 'border-border'}`}
                    placeholder="Your message here..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
