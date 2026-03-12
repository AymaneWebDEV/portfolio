import type { Project as SiteProject } from '../config/site';

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  age: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  navLinks: Array<{ name: string; href: string }>;
  skills: {
    frontend: string[];
    backend: string[];
    infrastructure: string[];
    tools: string[];
    languages: Array<{ name: string; level: string }>;
    softSkills: string[];
  };
  experience: Array<{
    role: string;
    company: string;
    location: string;
    period: string;
    description: string | string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    period: string;
    description: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    tags: string[];
    image: string;
    githubUrl?: string;
    liveUrl?: string;
    content?: string;
  }>;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription?: readonly string[];
  readonly tags: readonly string[];
  readonly image: string;
  readonly links: {
    readonly github: string;
    readonly live: string;
  };
  readonly content?: string;
}
