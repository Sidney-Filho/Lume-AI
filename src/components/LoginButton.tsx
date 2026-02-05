"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutGrid, User as UserIcon } from "lucide-react";

export default function LoginButton({ user }: { user: User | null }) {
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (user) {
    return (
      <DropdownMenu>
        {/* Removemos o onClick daqui para o Dropdown funcionar */}
        <DropdownMenuTrigger className="flex items-center gap-3 outline-none cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
              {user.user_metadata?.full_name}
            </p>
            <p className="text-[10px] text-slate-500">
              {user.email}
            </p>
          </div>
          <div className="relative w-9 h-9 border-2 border-transparent group-hover:border-indigo-100 rounded-full transition-all">
            <Image 
              src={user.user_metadata?.avatar_url} 
              alt="Profile" 
              fill 
              className="rounded-full object-cover"
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 mt-2 shadow-xl border-slate-200">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Account</p>
              <p className="text-xs leading-none text-slate-500">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            className="cursor-pointer gap-2" 
            onClick={() => router.push('/dashboard')}
          >
            <LayoutGrid className="w-4 h-4 text-slate-500" />
            My Library
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer gap-2 text-red-600 focus:text-red-600 focus:bg-red-50" 
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button variant="outline" onClick={handleLogin} className="cursor-pointer">
      Sign in with Google
    </Button>
  );
}