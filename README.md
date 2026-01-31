# TechPulse Daily

Your Daily Dose of Tech Innovation - A modern tech news and tutorials website.

## Features

- 📱 Fully responsive design
- 🌙 Dark mode support
- 🔍 Article search
- 📧 Newsletter subscription
- 📊 PostHog analytics integration
- 📺 Revive ad server integration
- ⚡ Fast performance with Vite

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Analytics**: PostHog
- **Ads**: Revive Adserver

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

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

### Environment Variables

Create a `.env.local` file based on `.env.production`:

```env
VITE_SITE_ID=your-site-id
VITE_SITE_NAME=your-site-name
VITE_SITE_URL=https://your-domain.com
VITE_API_URL=https://api.example.com
VITE_POSTHOG_KEY=your-posthog-key
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_REVIVE_URL=https://ads.example.com
VITE_REVIVE_ID=1
```

## Project Structure

```
src/
├── components/
│   ├── ads/           # Ad components (Revive)
│   ├── layout/        # Header, Footer, Sidebar
│   └── ui/            # Reusable UI components
├── contexts/          # React contexts (Theme)
├── hooks/             # Custom hooks
├── lib/               # Utilities and constants
├── pages/             # Page components
├── services/          # API and external services
└── types/             # TypeScript types
```

## Routes

- `/` - Homepage
- `/artigo/:slug` - Article detail
- `/categoria/:slug` - Category listing
- `/sobre` - About page
- `/contato` - Contact page
- `/busca` - Search page

## License

MIT License
