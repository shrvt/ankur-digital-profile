// src/pages/index.tsx (or app/page.tsx)

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const Index = () => {
  useEffect(() => {
    document.title = 'Ankur Shrivastava | Senior Software Engineer';

    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      const savedTheme = localStorage.getItem('theme');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* The Hero section is separate as it has unique layout needs */}
      <HeroSection />

      {/*
        THIS IS THE FIX:
        A new wrapper div that controls all the spacing between sections.
        'space-y-20' adds a 5rem (80px) margin-top between each section.
        'md:space-y-28' increases that to 7rem (112px) on medium screens.
        Adjust these values to get the exact spacing you want.
      */}
      <main className="space-y-20 md:space-y-28">
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
