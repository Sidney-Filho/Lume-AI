import { NextResponse } from 'next/server'
// Importamos o criador de cliente que você configurou seguindo a documentação nova
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Se houver um "next" nos params, usamos para redirecionar, senão vai para o dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    
    // Esta função troca o código temporário do Google por uma sessão real (setando os cookies)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Se algo der errado, volta para a home com um erro (opcional)
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}