"use client";

import { useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { 
  Search, 
  ExternalLink, 
  Globe, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AddLinkModal } from "@/components/AddLinkModal";
import { DeleteButton } from "@/components/DeleteButton";

export default function DashboardClient({ collections }: { collections: any[], user: any }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollections = collections?.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.ai_summary?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">My Library</h2>
            <p className="text-slate-500 text-sm">Explore and manage your AI-summarized insights.</p>
          </div>
          <AddLinkModal />
        </header>

        {/* Barra de Pesquisa */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search by title or content..."
            className="pl-10 h-12 bg-white shadow-sm border-slate-200 focus-visible:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((item) => (
              <SummaryCard key={item.id} id={item.id} {...item} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
              <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No results found</h3>
              <p className="text-slate-500">Try adjusting your search terms or adding a new link.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ id, title, ai_summary, url, created_at }: any) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const date = created_at ? new Date(created_at).toLocaleDateString() : "No date";

  const handleCopy = () => {
    navigator.clipboard.writeText(ai_summary);
    setCopied(true);
    toast.success("Summary copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="hover:shadow-md transition-all bg-white border-slate-200 flex flex-col group h-fit">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-md font-bold leading-tight group-hover:text-indigo-600 transition-colors">
            {title}
          </CardTitle>
          <div className="flex gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8 text-slate-400 hover:text-indigo-600 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-600 p-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <DeleteButton id={id} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Renderização com Markdown e Expansão de texto */}
        <div 
          className={`prose prose-sm max-w-none text-slate-600 leading-relaxed overflow-hidden transition-all ${
            !isExpanded ? "line-clamp-4" : ""
          }`}
        >
          <ReactMarkdown>
            {ai_summary}
          </ReactMarkdown>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 h-7 text-[11px] text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 px-2 cursor-pointer"
        >
          {isExpanded ? (
            <span className="flex items-center gap-1">Show less <ChevronUp className="w-3 h-3" /></span>
          ) : (
            <span className="flex items-center gap-1">Read full summary <ChevronDown className="w-3 h-3" /></span>
          )}
        </Button>
      </CardContent>

      <CardFooter className="pt-4 border-t flex items-center justify-between text-[10px] text-slate-400">
        <span suppressHydrationWarning className="font-medium uppercase tracking-wider">
          {date}
        </span>
        <Badge variant="outline" className="text-[10px] font-bold border-slate-200">
          AI INSIGHT
        </Badge>
      </CardFooter>
    </Card>
  );
}