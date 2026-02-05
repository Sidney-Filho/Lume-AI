"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Loader2, Sparkles } from "lucide-react";
import { summarizeAction } from "@/app/actions/summarize";
import { toast } from "sonner"; // Importante!

export function HomeHeroInput({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLoggedIn) {
      toast.error("Authentication required", {
        description: "Please sign in with Google to use the AI summarizer.",
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const url = formData.get("url") as string;

    // Toast de "Início de processamento"
    toast.info("Processing link...", {
      description: "Lume is reading the content and calling the AI.",
    });

    try {
      const result = await summarizeAction(formData);
      
      if (result.success) {
        toast.success("Insight generated!", {
          description: "Your summary was successfully saved to your library.",
          action: {
            label: "View Library",
            onClick: () => window.location.href = "/dashboard",
          },
        });
        // Limpa o input após o sucesso
        (event.target as HTMLFormElement).reset();
      } else {
        toast.error("Failed to summarize", {
          description: result.error || "Check if the URL is valid.",
        });
      }
    } catch (error) {
      toast.error("Server Error", {
        description: "Something went wrong on our end. Try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
      <div className="relative flex-1">
        <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
        <Input
          name="url"
          type="url"
          required
          placeholder="Paste an article or video link here..."
          className="pl-10 h-12 border-none focus-visible:ring-0 text-lg"
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 font-semibold cursor-pointer min-w-[220px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            AI is thinking...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Summarize with AI
          </>
        )}
      </Button>
    </form>
  );
}