import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { About } from "@/components/site/about";
import { Footer } from "@/components/site/contact";
export const Route=createFileRoute("/about")({head:()=>({meta:[{title:"About ZehanX Tech | Software, Systems & AI"},{name:"description",content:"Learn how ZehanX Tech designs and builds custom software, websites, business systems and AI-powered products."}]}),component:AboutPage});
function AboutPage(){return <div className="min-h-screen bg-background text-foreground"><Navbar/><main className="pt-20"><About/></main><Footer/></div>}
