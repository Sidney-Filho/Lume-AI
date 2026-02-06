import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      console.log("✅ Auth bem sucedida!");
      return NextResponse.redirect(`${origin}${next}`)
    }
    
    // ISTO VAI MOSTRAR O ERRO REAL NOS LOGS DA VERCEL
    console.error("❌ Erro na troca de código:", error.message)
  }

  // Redireciona para a home em vez de uma página 404
  return NextResponse.redirect(`${origin}/?error=auth-failed`)
}