export const dynamic = 'force-dynamic';
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Zap, Tag, Search, Info } from "lucide-react";
import { HomeHeroInput } from "@/components/HomeHeroInput";

export default async function Home() {

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Hero Section */}
      <section className="container mx-auto pt-20 pb-12 px-4 text-center">
        <h2 className="text-5xl font-extrabold tracking-tight mb-6">
          Illuminate your knowledge with <span className="text-indigo-600">AI</span>.
        </h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Paste links to articles, videos, or documents. Lume summarizes, organizes, and creates intelligent connections so you never lose an insight again.
        </p>

        {/* Main Input Card */}
        <Card className="max-w-3xl mx-auto p-2 shadow-xl border-2 border-indigo-100">
          <HomeHeroInput isLoggedIn={!!user} />
          <p className="text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1">
            <Info className="w-3 h-3" /> 
            Currently optimized for articles, blogs, and documentation.
          </p>
        </Card>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-12 pb-20">
        <FeatureCard 
          icon={<Zap className="w-5 h-5 text-indigo-600" />}
          title="Smart Summaries" 
          desc="Gemini AI extracts key takeaways and essential points in seconds." 
        />
        <FeatureCard 
          icon={<Tag className="w-5 h-5 text-indigo-600" />}
          title="Auto-Tagging" 
          desc="Automatic organization by topics and themes using natural language processing." 
        />
        <FeatureCard 
          icon={<Search className="w-5 h-5 text-indigo-600" />}
          title="Semantic Search" 
          desc="Find information by its meaning and context, not just exact keywords." 
        />
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card className="p-6 bg-white hover:shadow-md transition-all border-slate-200 cursor-default">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </Card>
  );
}