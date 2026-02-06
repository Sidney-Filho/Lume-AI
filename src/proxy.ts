import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/proxy"

// O Next.js procura por uma função chamada 'middleware'
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Exclui explicitamente:
     * 1. caminhos de auth (/auth/callback, /auth/login, etc)
     * 2. arquivos estáticos (_next/static, images, favicon)
     */
    '/((?!auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}