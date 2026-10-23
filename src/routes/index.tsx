import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About, Marquee } from "@/components/site/about";
import { Process, Services } from "@/components/site/services";
import { Industries, Work } from "@/components/site/work";
import { Contact, Footer } from "@/components/site/contact";
import { EMAIL, CAL_URL, WHATSAPP_URL } from "@/lib/site";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const SITE_TITLE = "ZehanX Tech — AI Systems, Agentic AI & LLM Training";
const SITE_DESCRIPTION =
  "ZehanX Tech builds AI systems, agentic AI software, enterprise platforms and custom-trained LLMs — ML consulting, data engineering and MLOps.";

const SITE_KEYWORDS = [
  "AI development company",
  "machine learning consulting",
  "agentic AI software",
  "LLM training services",
  "LLM fine-tuning",
  "enterprise AI solutions",
  "custom AI systems",
  "data engineering",
  "MLOps services",
  "AI integration for business",
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
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ZehanX Tech",
          alternateName: "ZehanX Technologies",
          slogan: "Machine intelligence, built for business",
          description: SITE_DESCRIPTION,
          email: EMAIL,
          telephone: "+92-333-8188722",
          areaServed: "Worldwide",
          knowsAbout: [
            "Machine Learning",
            "Artificial Intelligence",
            "Agentic AI",
            "AI Agents",
            "Large Language Models",
            "LLM Fine-Tuning",
            "Retrieval-Augmented Generation",
            "Data Engineering",
            "Feature Stores",
            "Vector Databases",
            "MLOps",
            "Model Deployment",
            "Computer Vision",
            "Predictive Analytics",
            "Enterprise Software",
          ],
          sameAs: [CAL_URL, WHATSAPP_URL],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "AI & Data Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Systems Development" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic AI Software" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise Software" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "LLM Training & Fine-Tuning" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Engineering" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "MLOps & Deployment" } },
            ],
          },
        }),
      },
    ],
  }),
});

function Index() {
  useSmoothScroll();

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
