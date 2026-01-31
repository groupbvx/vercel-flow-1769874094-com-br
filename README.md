# TechPulse Daily

Your Daily Dose of Tech Innovation - A modern technology news and blog platform.

## 🚀 Features

- **Modern Stack**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: System-aware theme switching
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Performance**: Optimized images, code splitting, and lazy loading
- **Analytics**: PostHog integration for user analytics
- **Ad Support**: Revive Ad Server integration
- **Newsletter**: Built-in subscription system

## 📦 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Analytics**: PostHog

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ads/          # Ad components (Revive integration)
│   ├── layout/       # Layout components (Header, Footer, Sidebar)
│   └── ui/           # Reusable UI components
├── contexts/         # React contexts (Theme)
├── hooks/            # Custom hooks
├── lib/              # Utilities and constants
├── pages/            # Page components
├── services/         # API and external services
└── types/            # TypeScript types
```

## 🔧 Environment Variables

Create a `.env.production` file with the following variables:

```env
VITE_SITE_ID=your-site-id
VITE_SITE_NAME=TechPulse Daily
VITE_SITE_URL=https://your-domain.com
VITE_API_URL=https://api.your-domain.com
VITE_POSTHOG_KEY=your-posthog-key
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_REVIVE_URL=https://ads.your-domain.com
VITE_REVIVE_ID=1
```

## 📄 License

Copyright © 2024 TechPulse Daily. All rights reserved.
