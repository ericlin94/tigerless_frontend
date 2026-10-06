import type { HomeContent } from "./contracts";
const image = (file: string, alt: string) => ({ src: `/assets/${file}`, alt });
export const homeContent = {
  navigation: [
    { label: "Weight Loss", href: "#weight-loss" },
    { label: "Birth Control", href: "#birth-control" },
    { label: "Sleep", href: "#sleep" },
    { label: "Contact Us", href: "#contact" },
  ],
  languages: [
    "English",
    "中文",
    "Español",
    "Tiếng Việt",
    "한국어",
    "Tagalog",
    "العربية",
    "Français",
    "Português",
    "हिन्दी",
    "Русский",
  ],
  services: [
    {
      id: "weight-loss",
      label: "Weight Management",
      summary: "Compounded GLP-1 Semaglutide & Tirzepatide",
      tone: "mint",
      title: "Lose weight in your way.",
      benefits: [
        "Same-day doctor visits and prescriptions",
        "Dosage personalized",
        "Shipped from licensed US pharmacies",
      ],
      portrait: image("041b4.png", "Woman wearing an orange athletic top"),
      cta: "See plans",
    },
    {
      id: "birth-control",
      label: "Birth Control",
      summary: "Prescription birth control, delivered discreetly",
      tone: "pink",
      title: "Birth control, without the waiting room.",
      description:
        "Choose the method that fits your life. A US-licensed physician prescribes online, and your refills arrive automatically.",
      benefits: [
        "Prescribed online, delivered to your door",
        "Automatic refills, delivered",
        "Plain, discreet packaging",
      ],
      portrait: image("d5c11.png", "Woman smiling in a green sweater"),
      startingPrice: { amount: 20, currency: "USD", interval: "month" },
      cta: "Start your birth control consult",
    },
    {
      id: "sleep",
      label: "Sleep",
      summary: "Non-habit-forming formulations for sensitive sleepers",
      tone: "blue",
      title: "Sleep",
      description:
        "Real rest without the dependency. Non-habit-forming, physician-prescribed options for sensitive sleepers.",
      benefits: [
        "Non-controlled, non-habit-forming options",
        "Matched to your sleep pattern by a physician",
        "No controlled sedatives",
        "Cash-pay, no insurance needed",
      ],
      portrait: image(
        "4f025.png",
        "Woman sitting peacefully with her eyes closed",
      ),
      startingPrice: { amount: 20, currency: "USD", interval: "month" },
      cta: "Start your sleep consult",
    },
  ],
  plans: [
    {
      id: "semaglutide",
      serviceId: "weight-loss",
      name: "Compounded Semaglutide",
      price: { amount: 200, currency: "USD", interval: "month" },
      image: image("15205.png", "Illustrative compounded medication vial"),
      disclaimer:
        "Compounded medications are not FDA-approved. Product appearance may vary.",
    },
    {
      id: "tirzepatide",
      serviceId: "weight-loss",
      name: "Compounded Tirzepatide",
      price: { amount: 200, currency: "USD", interval: "month" },
      image: image("15205.png", "Illustrative compounded medication vial"),
      disclaimer:
        "Compounded medications are not FDA-approved. Product appearance may vary.",
    },
  ],
  careLayers: [
    {
      id: "physicians",
      title: "Human physicians",
      description:
        "They handle diagnosis, prescriptions, and every moment that calls for clinical judgment.",
      benefits: [
        "Diagnosis and treatment decisions.",
        "Prescriptions.",
        "Complex symptom evaluation.",
      ],
    },
    {
      id: "assistant",
      title: "AI care assistant",
      description:
        "It handles language and instant response, so nothing is lost in communication.",
      benefits: [
        "Real-time translation in every message.",
        "Answers around the clock.",
      ],
    },
  ],
  features: [
    {
      id: "support",
      title: "24/7 Provider Support",
      image: image(
        "3bb87.png",
        "Doctor speaking with a patient on a video call",
      ),
      presentation: "call",
    },
    {
      id: "treatment",
      title: "Easily Manage Treatment",
      image: image("ca59c.png", "Medical team managing patient treatment"),
      presentation: "photo",
    },
    {
      id: "medication",
      title: "Access to FDA-approved Medication Options",
      image: image("fdeb7.png", "Wegovy medication pens"),
      presentation: "medication",
    },
    {
      id: "shipping",
      title: "Free Expedited Shipping",
      image: image("33b80.png", "Patient receiving a package"),
      presentation: "photo",
    },
  ],
  testimonials: [
    {
      id: "maria",
      name: "Maria R.",
      location: "Houston, TX",
      serviceId: "weight-loss",
      rating: 5,
      quote:
        "I described my symptoms in my own language and actually felt understood, no translating in my head.",
    },
    {
      id: "portrait",
      name: "Patient story",
      location: "Queens, NY",
      serviceId: "birth-control",
      image: image("3d742.png", "Portrait accompanying a patient story"),
    },
    {
      id: "an",
      name: "An N.",
      location: "San Jose, CA",
      serviceId: "sleep",
      rating: 5,
      quote:
        "Private, simple, and in my language the whole way through. It made getting care feel normal again.",
    },
  ],
  faqs: [
    {
      id: "states",
      question: "What states do you serve in GLP-1 programs?",
      answer: "We are currently able to serve GLP-1 programs in all 50 states.",
    },
    {
      id: "languages",
      question: "Which languages do you support?",
      answer:
        "Our care assistant supports more than 40 languages, including English, Spanish, Chinese, Vietnamese, Korean, Tagalog, Arabic, French, Portuguese, Hindi, and Russian.",
    },
    {
      id: "insurance",
      question: "Do I need insurance?",
      answer:
        "No. Apsu is a cash-pay service. You pay for your medication; the price includes your consultation and shipping. No membership or subscription fee is required.",
    },
    {
      id: "compounded",
      question: "What is compounded medication?",
      answer:
        "Compounded medication is prepared by a licensed pharmacy for an individual patient. Compounded medications are not FDA-approved or evaluated by the FDA. Your physician decides whether a treatment is appropriate for you.",
    },
  ],
  footerGroups: [
    {
      title: "Products",
      links: [
        { label: "Weight Loss", href: "#weight-loss" },
        { label: "Birth Control", href: "#birth-control" },
        { label: "Sleep", href: "#sleep" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Apsu", href: "#how-it-works" },
        { label: "Blogs", href: "/information/blogs" },
        { label: "FAQs", href: "#faqs" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms", href: "/information/terms" },
        { label: "Privacy Policy", href: "/information/privacy" },
        { label: "Medication Safety Information", href: "/information/safety" },
      ],
    },
  ],
  disclaimer:
    "The information on this site is for general educational purposes and is not medical advice. Apsu is a technology platform; medical care is provided by independent, licensed providers, and pharmacy services by licensed pharmacies, who decide whether treatment is appropriate. Payment does not guarantee a prescription. Apsu offers compounded GLP-1 medication, which is prepared by licensed US compounding pharmacies and is not approved or evaluated by the FDA. Apsu does not manufacture medication, and product appearance may differ from images shown. Results vary and are not guaranteed. If this is an emergency, call 911.",
} satisfies HomeContent;
