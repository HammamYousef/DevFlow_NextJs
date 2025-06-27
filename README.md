# 💬 DevFlow

DevFlow is a modern full-stack web application inspired by **Stack Overflow**, built to empower developers to ask and answer questions, engage in discussions, explore job opportunities, and connect through a rich, intuitive interface.

> "A developer-focused platform built using the best of Next.js, TypeScript, and modern UI libraries."

  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Open_AI-black?style=for-the-badge&logoColor=white&logo=openai&color=412991" alt="openai" />
  </div>

---

## 🔗 Live Demo

[👉 Visit DevFlow (Vercel Link)](https://dev-flow-next-js.vercel.app)

---

## 🧠 Features

- 📝 Ask and answer technical questions using a beautiful Markdown editor
- ⬆️⬇️ Upvote/downvote questions and answers
- 📌 Save collections of questions
- 🔍 Global and local search functionality
- 📎 Tag filtering with intelligent recommendations
- 🧠 AI answer generation via OpenAI
- 👤 Developer profiles with stats and avatars
- 🖊️ Profile editing and customization
- 🔐 User authentication via **credentials**, **GitHub**, and **Google** (NextAuth.js)
- 💼 Job board powered by JSearch and REST APIs
- 📱 Fully responsive design with clean dark mode

---

## 🛠 Tech Stack

| Category   | Tech                                              |
| ---------- | ------------------------------------------------- |
| Framework  | [Next.js 14+ (App Router)](https://nextjs.org/)   |
| Language   | TypeScript                                        |
| UI         | Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/) |
| Auth       | NextAuth.js (Credentials, GitHub, Google)         |
| Editor     | [`@mdxeditor/editor`](https://mdxeditor.dev/)     |
| DB/Backend | MongoDB + Mongoose                                |
| Hosting    | Vercel                                            |
| API        | JSearch API, REST Countries, IP-API               |
| Logging    | `next-safe-logger`                                |

---

## 🔐 Authentication

DevFlow uses **NextAuth.js** to provide flexible authentication options:

- 📧 Email / Password login
- 🧑‍💻 GitHub OAuth
- 🟢 Google OAuth

Add the following to your `.env.local`:

```env
NEXTAUTH_SECRET=your_secure_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Learn more: [NextAuth Providers](https://next-auth.js.org/providers)

---

## 📁 Project Structure

```
hammamyousef-devflow_nextjs/
├── app/
│   ├── (auth)/sign-in, sign-up              → Auth pages
│   ├── (root)/ask-question, profile, jobs   → Core routes
│   ├── api/                                 → API Routes (auth, ai, users, questions)
│   ├── fonts/                               → Custom fonts
├── components/                              → Reusable UI components
│   ├── cards/, editor/, filters/, forms/, navigation/, votes/, etc.
├── constants/                               → Static config values (filters, routes, etc)
├── context/                                 → Theme provider
├── database/                                → Mongoose models
├── lib/                                     → DB utils, API helpers, and server actions
├── types/                                   → Global TypeScript types
├── public/                                  → Static files
├── next.config.ts, middleware.ts, etc.      → App configuration
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HammamYousef/DevFlow_NextJs.git
cd DevFlow_NextJs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file and configure:

```env
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=your_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the App

```bash
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🔧 Key Packages Used

- `next`, `react`, `typescript`
- `next-auth` for authentication
- `mongoose` for MongoDB connection
- `@mdxeditor/editor` for Markdown input
- `shadcn/ui` & `tailwindcss` for design system
- `lucide-react` for icons
- `next-safe-logger` for logging

---

## 🚀 Future Improvements

- [ ] Real-time notifications with websockets
- [ ] Admin dashboard
- [ ] Infinite scrolling & pagination for large datasets
- [ ] User badges and roles
- [ ] Notification & Email system

---

## 📄 License

MIT License. Feel free to use and modify.
