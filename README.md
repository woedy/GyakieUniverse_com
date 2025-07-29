# Gyakie's Universe - Interactive 3D Portfolio

A beautiful static website featuring an interactive 3D universe where planets represent different portfolio sections (Music, Gallery, Tours, Shop, About). Built for deployment on Vercel.

## 🎨 Features

- **Interactive 3D Universe**: Navigate through space by clicking on planets
- **Beautiful Handwriting Fonts**: Elegant "Great Vibes" font for planet names
- **Smooth Animations**: Zoom transitions and page animations with Framer Motion
- **Mobile Responsive**: Works perfectly on all devices
- **Static Site**: No server dependencies, perfect for Vercel deployment

## 🚀 Quick Start

### Local Development

**IMPORTANT: First time setup**

1. **Replace package.json with complete dependencies:**
   ```bash
   # Delete the current package.json and replace it
   rm package.json
   cp package-complete.json package.json
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Go to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready for deployment.

## 🌐 Deployment on Vercel

1. **Upload project to GitHub/GitLab**
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will automatically detect the Vite configuration
3. **Deploy:** Vercel will build and deploy your static site automatically

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── 3d/          # 3D scene components
│   │   ├── sections/    # Portfolio sections
│   │   └── ui/          # UI components
│   ├── lib/             # Utilities and stores
│   ├── hooks/           # Custom React hooks
│   └── main.tsx         # App entry point
├── public/              # Static assets
│   ├── textures/        # 3D textures
│   ├── sounds/          # Audio files
│   └── geometries/      # 3D models
└── index.html           # HTML template
```

## 🎵 About Gyakie

This portfolio showcases the artistic universe of Gyakie, featuring her music, photo gallery, tour dates, merchandise, and personal story through an immersive 3D experience.

## 💫 Technologies Used

- **React 18** with TypeScript
- **Three.js** with React Three Fiber for 3D graphics
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management