"use server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteLinkAction(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");
  
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', id)
    .eq("user_id", user.id)

  if (error) { 
    console.error("Error deleting link:", error.message)
    throw new Error("Failed to delete link")
   }
  
  revalidatePath('/dashboard')
  return { success: true }
}