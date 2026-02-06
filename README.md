# 📑 Lume AI — Intelligent Summaries with Gemini

**Lume** is a SaaS platform that leverages Google's Artificial Intelligence (Gemini) to transform extensive content into structured, actionable summaries. Developed with a focus on performance and security, it uses the latest technologies from the Next.js and Supabase ecosystem.

---

## 🚀 Features

* **Google OAuth Authentication**: Secure login via Supabase Auth with PKCE (Proof Key for Code Exchange) flow.
* **AI-Powered Summarization**: Integration with the `google-generative-ai` API for high-fidelity natural language processing.
* **Personal Library**: An exclusive area for logged-in users to manage and access their saved summaries.
* **Responsive Interface**: A modern UI built with Tailwind CSS and accessible components.
* **Middleware Protection**: Advanced proxy system for session management and server-side route protection.

## 🛠️ Tech Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Auth & Database**: [Supabase](https://supabase.com/) (SSR & PostgreSQL)
* **AI Engine**: [Google Gemini API](https://ai.google.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
* **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
* **Deployment**: [Vercel](https://vercel.com/)

## ⚙️ Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Sidney-Filho/Lume-AI.git](https://github.com/Sidney-Filho/Lume-AI.git)
    cd Lume-AI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and fill it with your credentials from Supabase and Google AI Studio:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🔒 Security & Architecture

This project implements rigorous security standards for modern Full Stack applications:
* **Server-Side Rendering (SSR)**: Authentication cookie validation directly on the server to prevent flashes of unauthorized content.
* **PKCE Flow**: Ensures the exchange of authentication codes is protected against interception attacks.
* **Dynamic Runtime**: Configured with `force-dynamic` on critical routes to ensure data is always up to date.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
Developed by [Sidney Filho](https://github.com/Sidney-Filho)
