import { createFileRoute } from "@tanstack/react-router";
import { IdeaStudio } from "@/components/site/idea-studio";

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
    <IdeaStudio />
  );
}
