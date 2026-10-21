import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About, Marquee } from "@/components/site/about";
import { Process, Services } from "@/components/site/services";
import { Industries, Work } from "@/components/site/work";
import { Contact, Footer } from "@/components/site/contact";
import { EMAIL, CAL_URL, WHATSAPP_URL } from "@/lib/site";

const SITE_TITLE = "ZehanX Tech — AI Systems, Agentic Software & LLM Training";
const SITE_DESCRIPTION =
  "ZehanX Tech is an ML and data company building AI systems, agentic and enterprise software, and training LLMs for businesses and industries.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
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
          description: SITE_DESCRIPTION,
          email: EMAIL,
          telephone: "+92-333-8188722",
          sameAs: [CAL_URL, WHATSAPP_URL],
          knowsAbout: [
            "Machine Learning",
            "Artificial Intelligence",
            "Agentic AI",
            "Large Language Models",
            "Data Engineering",
            "Enterprise Software",
          ],
        }),
      },
    ],
  }),
});

function Index() {
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
