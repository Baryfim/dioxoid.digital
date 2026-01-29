# Dioxoid Studio - Next.js + Tailwind CSS

A premium, high-end web studio website built with Next.js + TypeScript + Tailwind CSS.

## Features

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Cursor** - Physics-based cursor with hover effects
- **Smooth Animations** - CSS animations and transitions
- **Noise & Scanline Effects** - Visual effects for premium feel
- **Responsive Design** - Mobile-first approach
- **Multiple Pages** - Home, Work, Journal, Contact, Case Study, Article

## Project Structure

```
dioxoid-nextjs/
├── app/
│   ├── layout.tsx      # Root layout with fonts and effects
│   └── page.tsx        # Main page
├── components/
│   ├── Typography.tsx  # Heading and text components
│   ├── Button.tsx      # Button component
│   ├── Input.tsx       # Form inputs
│   ├── LayoutComponents.tsx  # Cards, Accordions, etc.
│   ├── ComplexComps.tsx      # Tooltips, Alerts, etc.
│   ├── AppContent.tsx        # Shared components and data
│   ├── MainApp.tsx           # Main app with routing
│   └── pages/
│       ├── LandingPage.tsx   # Home page
│       ├── WorkPage.tsx      # Work/Portfolio page
│       ├── JournalPage.tsx   # Blog/Journal page
│       ├── ArticlePage.tsx   # Single article
│       ├── CaseStudyPage.tsx # Case study detail
│       └── ContactPage.tsx   # Contact form
├── styles/
│   └── globals.css     # Tailwind imports + custom styles
├── types/
│   └── index.ts        # TypeScript types
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── next.config.js      # Next.js config
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
```

The static files will be generated in the `dist` folder.

## Visual Features

- All original animations (blur-in, fade-in, marquee, float, etc.)
- Custom cursor with mix-blend-mode
- Noise overlay effect
- Scanline animation
- Gradient backgrounds and glows
- Grid patterns
- Typography with Manrope and Playfair Display fonts
- All hover effects and transitions
- Responsive breakpoints

## Tailwind Configuration

The `tailwind.config.js` includes:
- Custom fonts (Manrope, Playfair Display)
- Custom colors (stone palette, emerald accents)
- Custom animations (float, marquee, blur-in, etc.)

## License

MIT
