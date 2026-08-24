import React, { useState, useEffect } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { StoryHighlights } from './components/sections/StoryHighlights';
import { SkillsSection } from './components/sections/SkillsSection';
import { PlatformsSection } from './components/sections/PlatformsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { VolunteerSection } from './components/sections/VolunteerSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { WhyWorkWithMe } from './components/sections/WhyWorkWithMe';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectModal } from './components/ui/ProjectModal';
import { StoryModal } from './components/ui/StoryModal';
import { CvModal } from './components/ui/CvModal';
import { FloatingCvButton } from './components/ui/FloatingCvButton';
import { Preloader } from './components/ui/Preloader';

export const App: React.FC = () => {
  const { language, direction } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // RATIONALE: Keep html dir and lang attributes in sync with global state on initial load and updates.
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <>
      {/* Luxury Brand Preloader */}
      {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}

      <div className="min-h-screen flex flex-col bg-[#fafafc] text-[#0e1a36] relative selection:bg-[#eedcfc] selection:text-[#5b2b99]">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <StoryHighlights />
          <SkillsSection />
          <PlatformsSection />
          <ExperienceSection />
          <ProjectsSection />
          <VolunteerSection />
          <CertificationsSection />
          <WhyWorkWithMe />
          <ContactSection />
        </main>

        {/* Global Modals for Stories, Projects, Certifications, and CV */}
        <ProjectModal />
        <StoryModal />
        <CvModal />

        {/* Persistent Floating Quick Action Button */}
        <FloatingCvButton />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;
