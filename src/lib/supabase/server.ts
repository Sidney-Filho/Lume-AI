import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  // Buscamos as variáveis
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Se uma delas falhar, o log da Vercel vai nos avisar antes do erro de API
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ ERRO CRÍTICO: Variáveis de ambiente não carregadas.");
    throw new Error("Missing Supabase Env Vars");
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Comum em Server Components
          }
        },
      },
    }
  )
}