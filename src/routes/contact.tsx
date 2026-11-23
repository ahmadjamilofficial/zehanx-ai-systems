import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Contact, Footer } from "@/components/site/contact";
export const Route=createFileRoute("/contact")({head:()=>({meta:[{title:"Contact ZehanX Tech | Book a Project Call"},{name:"description",content:"Talk to ZehanX Tech about custom software, business systems, websites and AI development."}]}),component:ContactPage});
function ContactPage(){return <div className="min-h-screen bg-background text-foreground"><Navbar/><main className="pt-20"><Contact/></main><Footer/></div>}
