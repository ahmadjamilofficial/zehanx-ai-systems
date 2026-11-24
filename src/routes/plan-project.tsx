import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { ProjectPlanner } from "@/components/site/project-planner";

export const Route = createFileRoute("/plan-project")({
  component: PlanProjectPage,
  head: () => ({
    meta: [
      { title: "Plan Your Project — ZehanX Tech" },
      { name: "description", content: "Tell ZehanX Tech what you're building through a guided project planning process. Our team will review your brief and get back to you." },
      { property: "og:title", content: "Plan Your Project — ZehanX Tech" },
      { property: "og:description", content: "A few focused questions to turn your idea into a clear project brief." },
      { property: "og:url", content: "https://zehanxtech.vercel.app/plan-project" },
    ],
    links: [{ rel: "canonical", href: "https://zehanxtech.vercel.app/plan-project" }],
  }),
});

function PlanProjectPage() {
  return (
    <div className="h-[100dvh] min-h-[100svh] overflow-hidden bg-background text-foreground">
      <Navbar />
      <ProjectPlanner />
    </div>
  );
}
