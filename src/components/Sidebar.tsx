"use client";
import { Button } from "@/components/ui/button";
import { LayoutGrid,Sparkles, Home } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Sidebar({ userEmail }: { userEmail?: string }) {

  const {isOpen} = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const handleLibraryClick = () => {
    if (!userEmail) {
      toast.error("Access Denied", {
        description: "You need to log in with Google to access your library.",
      });
      return;
    }
    router.push('/dashboard');
  };

  return (
    <aside className={cn(
      "bg-white border-r flex flex-col h-screen sticky top-0 transition-all duration-300 overflow-hidden shrink-0",
      isOpen ? "w-64" : "w-0 border-none"
    )}>
      <div className="p-6">
        <Link href="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <Sparkles className="w-6 h-6" /> Lume
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/')}
          className={`w-full justify-start gap-3 ${pathname === '/' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'} cursor-pointer`}
        >
          <Home className="w-4 h-4" /> Home
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleLibraryClick} // Usamos a função em vez do router.push direto
          className={`w-full justify-start gap-3 ${pathname === '/dashboard' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'} cursor-pointer`}
        >
          <LayoutGrid className="w-4 h-4" /> Library
        </Button>
      </nav>
    </aside>
  );
}