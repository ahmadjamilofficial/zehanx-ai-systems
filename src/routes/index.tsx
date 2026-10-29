import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About, Marquee } from "@/components/site/about";
import { Process, Services } from "@/components/site/services";
import { Industries, Work } from "@/components/site/work";
import { Contact, Footer } from "@/components/site/contact";
import { EMAIL, CAL_URL, WHATSAPP_URL, X_URL } from "@/lib/site";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { attachSoundTriggers } from "@/lib/sounds";

const SITE_TITLE = "ZehanX Tech — Full-Stack ML Solutions | Data Infrastructure, Model Development & Applied AI";
const SITE_DESCRIPTION =
  "ZehanX Tech helps enterprises turn complex data into production-ready machine learning systems — from dataset engineering and model development to evaluation and deployment.";

const SITE_KEYWORDS = [
  "machine learning solutions",
  "ML data infrastructure",
  "model development services",
  "model evaluation",
  "applied AI systems",
  "enterprise ML consulting",
  "dataset engineering",
  "data annotation",
  "synthetic data generation",
  "model fine-tuning",
  "computer vision services",
  "NLP solutions",
  "ML deployment",
  "production AI systems",
  "MLOps consulting",
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "keywords", content: SITE_KEYWORDS.join(", ") },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: "https://zehanxtech.com" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://zehanxtech.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "ZehanX Tech - Full-Stack ML Solutions Provider" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: "https://zehanxtech.com/og-image.jpg" },
      { name: "twitter:image:alt", content: "ZehanX Tech - Full-Stack ML Solutions Provider" },
    ],
    links: [{ rel: "canonical", href: "https://zehanxtech.com" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ZehanX Tech",
          alternateName: "ZehanX Technologies",
          legalName: "ZehanX Technologies",
          url: "https://zehanxtech.com",
          slogan: "From complex data to production-ready intelligence",
          description: SITE_DESCRIPTION,
          email: EMAIL,
          telephone: "+92-333-8188722",
          areaServed: {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: "24.8607",
              longitude: "67.0011",
            },
            geoRadius: "1000000",
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "PK",
            addressRegion: "Sindh",
            addressLocality: "Karachi",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+92-333-8188722",
            contactType: "sales",
            email: EMAIL,
            availableLanguage: ["English"],
          },
          knowsAbout: [
            "Machine Learning",
            "Data Infrastructure",
            "Dataset Engineering",
            "Data Annotation",
            "Synthetic Data Generation",
            "Model Development",
            "Model Evaluation",
            "Computer Vision",
            "Natural Language Processing",
            "Model Fine-Tuning",
            "Performance Optimization",
            "Applied AI Systems",
            "AI Integration",
            "MLOps",
            "Model Deployment",
            "Production ML",
          ],
          sameAs: [CAL_URL, WHATSAPP_URL, X_URL],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "ML Solutions Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "ML Data Solutions",
                  description: "Dataset engineering, data cleaning, annotation, synthetic data generation, and training-data pipelines",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Model Development & Evaluation",
                  description: "Classical ML, deep learning, computer vision, NLP, model fine-tuning, benchmarking, and performance optimization",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Applied AI Systems",
                  description: "Build, integrate, deploy, and maintain production AI systems that solve specific operational problems",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "ML Consulting",
                  description: "Enterprise ML consulting for data infrastructure, model development, and production deployment",
                },
              },
            ],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://zehanxtech.com",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What services does ZehanX Tech provide?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ZehanX Tech provides four core ML services: ML Data Solutions (dataset engineering, data cleaning, annotation, synthetic data generation), Model Development & Evaluation (classical ML, deep learning, computer vision, NLP, model fine-tuning), Applied AI Systems (building and deploying production AI systems), and ML Consulting (enterprise advisory for ML strategy and implementation).",
              },
            },
            {
              "@type": "Question",
              name: "Does ZehanX Tech work with enterprises?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, ZehanX Tech specializes in enterprise ML solutions, helping organizations turn complex data into production-ready machine learning systems with measurable business outcomes.",
              },
            },
            {
              "@type": "Question",
              name: "What industries does ZehanX Tech serve?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ZehanX Tech serves finance and banking, healthcare, retail and e-commerce, manufacturing, logistics and supply chain, telecom, energy and utilities, and education sectors.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  useSmoothScroll();

  useEffect(() => attachSoundTriggers(), []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Work />
        <Industries />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
