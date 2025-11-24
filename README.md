# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern and clean UI design
- 🌙 Dark mode support
- 📱 Fully responsive
- ⚡ Fast and optimized with Next.js
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Update Your Information

1. **Homepage**: Edit `app/page.tsx` to update your hero section and about content
2. **Projects**: Edit `data/projects.ts` to add, remove, or modify your projects
3. **Navigation**: Edit `components/Navbar.tsx` to customize navigation links
4. **Metadata**: Update `app/layout.tsx` to change site title and description

### Styling

The project uses Tailwind CSS. You can customize colors, fonts, and other design tokens in `tailwind.config.js`.

## Deployment

The easiest way to deploy your portfolio is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   ├── projects/
│   │   └── page.tsx    # Projects page
│   └── globals.css     # Global styles
├── components/
│   ├── Navbar.tsx      # Navigation component
│   └── ProjectCard.tsx # Project card component
├── data/
│   └── projects.ts     # Project data
└── types/
    └── project.ts      # TypeScript types
```

## License

MIT

