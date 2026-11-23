import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { IdeaStudio } from "@/components/site/idea-studio";
import { Footer } from "@/components/site/contact";

export const Route = createFileRoute("/idea-studio")({
  component: IdeaStudioPage,
  head: () => ({
    meta: [
      { title: "AI Project Planner — ZehanX Tech" },
      { name: "description", content: "Plan your software, automation or AI project through a guided, prompt-by-prompt discovery conversation with ZehanX Tech." },
      { property: "og:title", content: "AI Project Planner — ZehanX Tech" },
      { property: "og:description", content: "Turn your idea into a structured project brief with guided AI discovery." },
      { property: "og:url", content: "https://zehanxtech.vercel.app/idea-studio" },
    ],
    links: [{ rel: "canonical", href: "https://zehanxtech.vercel.app/idea-studio" }],
  }),
});

function IdeaStudioPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <IdeaStudio />
      </main>
      <Footer />
    </div>
  );
}
