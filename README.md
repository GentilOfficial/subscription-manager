# Subet — Subscription Manager

Subet is a modern, high-performance web application designed to help you regain control of your recurring expenses. Built with **Next.js 16**, **Tailwind CSS v4**, and **Supabase**, it offers a premium user experience with a focus on speed, aesthetics, and meaningful financial insights.


## 🚀 Key Features

- **Intuitive Dashboard**: A Bento Grid-powered overview of your monthly burn rate and upcoming renewals.
- **Interactive Analytics**: Visualise your spending distribution by category using dynamic charts powered by Recharts.
- **Smart Icons**: Automatic favicon fetching for your services using Unavatar, with intelligent fallbacks.
- **Bulk Import**: Seamlessly migrate your data from other platforms via CSV import.
- **Responsive "Floating Island" Navbar**: A state-of-the-art navigation experience that adapts gracefully to any device.
- **Dark Mode Native**: Fully optimized for both light and dark environments with smooth transitions.
- **Semantic Theme System**: Built on Tailwind v4 variables for effortless skinning and consistent branding.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: Lucide & Custom SVG System

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/subscription-manager.git
cd subscription-manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### 4. Database Initialization
Run the provided SQL schema in your Supabase SQL Editor:
- [supabase_schema.sql](file:///Users/federico/Documents/GitHub/Projects/subscription-manager/supabase_schema.sql)

### 5. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/app/components`: Reusable UI components and page sections.
- `/app/config`: Centralized content and site configuration (`content.js`, `site.js`).
- `/stores`: Zustand stores for global state management.
- `/public`: Static assets and icons.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
Developed with ❤️ by Federico.
