"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Loader2, Sparkles } from "lucide-react";
import { summarizeAction } from "@/app/actions/summarize";
import { useRouter } from "next/navigation";

export function AddLinkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    // Inicia o toast de carregamento
    const toastId = toast.loading("AI is reading the link...", {
      description: "This may take a few seconds.",
    });

    try {
      const result = await summarizeAction(formData);
      
      if (result.success) {
        // Sucesso: Atualiza o toast e a UI
        toast.success("New insight added!", {
          id: toastId,
          description: "The summary is now available in your library.",
        });
        
        setIsOpen(false); // Fecha o modal
        router.refresh(); // Atualiza os dados da lista
      } else {
        // Erro retornado pela Action
        toast.error("Process failed", {
          id: toastId,
          description: result.error || "Could not process this URL.",
        });
      }
    } catch (error) {
      // Erro inesperado
      toast.error("Error", {
        id: toastId,
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2 cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" /> Add New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Add New Insight
          </DialogTitle>
          <DialogDescription>
            Paste a URL below. Our AI will read the content and generate a concise summary for you.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              id="url"
              name="url"
              placeholder="https://example.com/article"
              type="url"
              required
              autoComplete="off"
              disabled={isLoading}
              className="h-11"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 cursor-pointer transition-all" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                AI is thinking...
              </>
            ) : (
              "Generate Summary"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}