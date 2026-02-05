"use server"

import { createClient } from "@/lib/supabase/server"
import * as cheerio from "cheerio"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function summarizeAction(formData: FormData) {
  const url = formData.get("url") as string
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return { 
      success: false, 
      error: "At the moment, Lume focuses on articles and text-based content. YouTube support is coming soon!" 
    };
  }

  if (!user) throw new Error("Unauthorized")

  try {
    // 1. Web Scraping
    const responseFetch = await fetch(url)
    const html = await responseFetch.text()
    const $ = cheerio.load(html)
    
    $("script, style, nav, footer").remove() // Limpeza mais agressiva para economizar tokens
    const pageTitle = $("title").text() || "No title found"
    const pageText = $("body").text().replace(/\s+/g, ' ').trim().substring(0, 8000) 

    // 2. Integração com Gemini
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite", // Modelo correto e estável
      generationConfig: { responseMimeType: "application/json" } 
    })
    
    const prompt = `
      Analyze this text and return a JSON object with EXACTLY these keys: "summary" (string, 3 concise bullet points) and "tags" (array of 3 strings).
      Text: ${pageText}
    `;

    const result = await model.generateContent(prompt)
    const resultResponse = await result.response;
    const rawText = resultResponse.text();

    // Limpeza de Markdown caso a IA ignore o mimeType
    const jsonString = rawText.replace(/```json|```/g, "").trim();
    const aiResponse = JSON.parse(jsonString);

    // 3. Salvar no Supabase
    const { data, error } = await supabase
      .from('collections')
      .insert({
        user_id: user.id,
        url: url,
        title: pageTitle,
        ai_summary: aiResponse.summary,
        // Opcional: Se você quiser salvar as tags como texto por enquanto
        // ai_tags: aiResponse.tags 
      })
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    console.error("Summarize Action Error:", error.message)
    return { success: false, error: error.message || "Failed to process link" }
  }
}