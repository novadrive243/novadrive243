
export interface Driver {
  id: string;
  name: string;
  image?: string;
  experience: string;
  rating: number;
  languages: string[];
  certifications: string[];
  phone?: string;
  bio?: string;
  availability?: string;
  location?: string;
  specialties?: string[];
}
