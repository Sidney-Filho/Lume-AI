"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";
import LoginButton from "./LoginButton";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

export function Header({ user }: { user: User | null }) {
  const { isOpen, toggle } = useSidebar();

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md px-4 py-3">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center gap-4">
          {/* Botão de Toggle visível em qualquer página */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggle} 
            className="text-slate-500 cursor-pointer"
          >
            {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          </Button>

          {/* Logo que aparece quando a sidebar está fechada (opcional) */}
          {!isOpen && (
            <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600 animate-in fade-in duration-500">
              <Sparkles className="w-5 h-5" />
              <span>Lume</span>
            </Link>
          )}
        </div>

        <LoginButton user={user} />
      </div>
    </nav>
  );
}