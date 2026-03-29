export interface SiteSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  siteName: string;
  siteDescription: string;
  address: string;
  email: string;
  phone: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    pinterest: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  image: string;
  gallery: string[];
  featured: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}
