# N2N-AFE Website

A full-stack website powered by **Next.js** (frontend) and **Strapi CMS** (backend).

## Project Structure

```
N2N-AFE/
├── frontend/          # Next.js 15 (App Router + TypeScript + Tailwind)
└── backend/           # Strapi v5 CMS (SQLite for development)
```

## Pages (Sitemap)

| Page | Route | Strapi Content Type |
|------|-------|---------------------|
| Home | `/` | `home-page` (Single Type) |
| Global Business | `/global-business` | `global-business` (Single Type) |
| Business Partnership | `/business-partnership` | `business-partnership` (Single Type) |
| News & Insights | `/news-insights` | `news-insights-page` + `article` (Collection) |
| About N2N-AFE | `/about` | `about-page` (Single Type) |
| Login / Register | `/login` | Static page |
| Privacy Policy | `/privacy-policy` | `privacy-policy` (Single Type) |

產品總覽區塊在首頁錨點 `/#product-overview`；舊網址 `/products-services` 由 Next 永久轉址至該錨點。

## Getting Started

### 1. Start Strapi CMS (Backend)

```bash
cd backend
npm run develop
```

Strapi admin panel will be available at: http://localhost:1337/admin

**First time setup:**
1. Create your admin account at http://localhost:1337/admin
2. Go to Settings → API Tokens → Create new token (Full Access)
3. Copy the token and paste into `frontend/.env.local` as `STRAPI_API_TOKEN`
4. Go to Settings → Users & Permissions Plugin → Roles → Public
5. Enable `find` and `findOne` for all content types

### 2. Start Next.js Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at: http://localhost:3000

## CMS Content Types

### Shared Components
- **SEO** - Meta title, description, keywords, share image
- **Hero** - Title, subtitle, background image, CTA button
- **Content Block** - Title, rich text body, image (with position)
- **Feature Card** - Title, description, icon, link

### Single Types (one entry per page)
Each page content type includes:
- `hero` - Hero banner component
- `pageTitle` - Main page heading
- `pageDescription` / `content` - Rich text content
- `sections` - Repeatable content blocks
- `seo` - SEO metadata

### Collection Types
- **Article** - News & Insights articles with slug, category, rich text content, cover image

## Environment Variables

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token
```

## Technology Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Lucide React
- **Backend**: Strapi v5, SQLite (dev) / PostgreSQL (production)
- **Images**: Next.js Image Optimization with Strapi media uploads
