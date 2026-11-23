import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Work } from "@/components/site/work";
import { Footer } from "@/components/site/contact";
export const Route=createFileRoute("/work")({head:()=>({meta:[{title:"Selected Work | ZehanX Tech"},{name:"description",content:"Explore selected software, data and applied AI builds from ZehanX Tech."}]}),component:WorkPage});
function WorkPage(){return <div className="min-h-screen bg-background text-foreground"><Navbar/><main className="pt-20"><Work/></main><Footer/></div>}
