export type ServiceId = "weight-loss" | "birth-control" | "sleep";
export type ImageAsset = { src: string; alt: string };
export type Money = { amount: number; currency: "USD"; interval: "month" };
export type NavigationItem = { label: string; href: string };
export type Service = {
  id: ServiceId;
  label: string;
  summary: string;
  tone: "mint" | "pink" | "blue";
  title: string;
  description?: string;
  benefits: readonly string[];
  portrait: ImageAsset;
  startingPrice?: Money;
  cta: string;
};
export type MedicationPlan = {
  id: string;
  serviceId: ServiceId;
  name: string;
  price: Money;
  image: ImageAsset;
  disclaimer: string;
};
export type CareLayer = {
  id: string;
  title: string;
  description: string;
  benefits: readonly string[];
};
export type Feature = {
  id: string;
  title: string;
  image: ImageAsset;
  presentation: "call" | "photo" | "medication";
};
export type Testimonial = {
  id: string;
  name: string;
  location: string;
  serviceId: ServiceId;
  quote?: string;
  rating?: number;
  image?: ImageAsset;
};
export type Faq = { id: string; question: string; answer: string };
export type FooterGroup = { title: string; links: readonly NavigationItem[] };
export type HomeContent = {
  navigation: readonly NavigationItem[];
  languages: readonly string[];
  services: readonly Service[];
  plans: readonly MedicationPlan[];
  careLayers: readonly CareLayer[];
  features: readonly Feature[];
  testimonials: readonly Testimonial[];
  faqs: readonly Faq[];
  footerGroups: readonly FooterGroup[];
  disclaimer: string;
};
export type BmiInput = { heightCm: number; weightKg: number };
export type BmiResult = {
  value: number;
  category: "Underweight" | "Healthy weight" | "Overweight" | "Obesity range";
};
export type ConsultationRequest = {
  serviceId: ServiceId;
  language: string;
  email: string;
};
export type ConsultationPreview = {
  status: "preview";
  serviceLabel: string;
  language: string;
  email: string;
};
