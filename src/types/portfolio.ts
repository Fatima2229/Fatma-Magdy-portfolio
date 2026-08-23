import { z } from 'zod';

export type Language = 'en' | 'ar';

export interface NavItem {
  id: string;
  labelEn: string;
  labelAr: string;
  href: string;
}

export interface StorySlide {
  id: string;
  headlineEn: string;
  headlineAr: string;
  textEn: string;
  textAr: string;
  tagEn: string;
  tagAr: string;
  bgGradient: string;
  iconName: string;
}

export interface StoryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  icon: string;
  categoryEn: string;
  categoryAr: string;
  ringColor: string;
  slides: StorySlide[];
}

export interface SkillCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  skills: {
    nameEn: string;
    nameAr: string;
    tagEn: string;
    tagAr: string;
  }[];
}

export interface PlatformItem {
  id: string;
  name: string;
  roleEn: string;
  roleAr: string;
  icon: string;
  color: string;
  bgGlow: string;
  badgeEn: string;
  badgeAr: string;
  descriptionEn: string;
  descriptionAr: string;
  formatsEn: string[];
  formatsAr: string[];
  metricsEn: string;
  metricsAr: string;
}

export interface ExperienceItem {
  id: string;
  roleEn: string;
  roleAr: string;
  companyEn: string;
  companyAr: string;
  periodEn: string;
  periodAr: string;
  typeEn: string;
  typeAr: string;
  descriptionEn: string;
  descriptionAr: string;
  responsibilitiesEn: string[];
  responsibilitiesAr: string[];
  skills: string[];
  growthEn?: string;
  growthAr?: string;
}

export interface ProjectSlide {
  id: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  type: 'hook' | 'value' | 'strategy' | 'result';
}

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  taglineEn: string;
  taglineAr: string;
  summaryEn: string;
  summaryAr: string;
  deliverablesEn: string[];
  deliverablesAr: string[];
  tools: string[];
  color: string;
  iconName: string;
  badgeEn: string;
  badgeAr: string;
  // Social media post specific fields
  platform: 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'strategy';
  postType: 'carousel' | 'reel' | 'single' | 'calendar' | 'case-study';
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  reachGrowth: string;
  engagementRate: string;
  hashtags: string[];
  postDateEn: string;
  postDateAr: string;
  captionEn: string;
  captionAr: string;
  carouselSlides?: ProjectSlide[];
}

export interface VolunteerItem {
  id: string;
  organizationEn: string;
  organizationAr: string;
  locationEn: string;
  locationAr: string;
  durationEn: string;
  durationAr: string;
  roleEn: string;
  roleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconType: 'food' | 'charity' | 'aid' | 'community';
  hasCertificate?: boolean;
  hasCertificatePending?: boolean;
  certificateImage?: string;
  impactEn?: string;
  impactAr?: string;
}

export interface CertificationItem {
  id: string;
  titleEn: string;
  titleAr: string;
  issuerEn: string;
  issuerAr: string;
  categoryEn: string;
  categoryAr: string;
  statusEn: string;
  statusAr: string;
  iconName: string;
  certificateImage?: string;
  skillsAcquiredEn?: string[];
  skillsAcquiredAr?: string[];
}

export interface WhyMeItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
  highlightEn: string;
  highlightAr: string;
  metricEn?: string;
  metricAr?: string;
}

// RATIONALE: Zod schema ensures strict validation on the client before submission, localized dynamically.
export const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters' }),
  serviceInterest: z.string().min(1, { message: 'Please select an area of interest' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
