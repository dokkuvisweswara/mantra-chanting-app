# Content Slider Implementation Guide

## Overview
A responsive Swiper.js carousel component for displaying movie/content cards with TypeScript support. Displays 4 cards per slide on 1080px+ screens with responsive breakpoints.

## Components Created

### 1. **Types** (`types/content.ts`)
Complete TypeScript interfaces for your API response structure:
- `Content` - Individual content item
- `ContentResponse` - API response wrapper
- `Poster` - Poster image information
- `CastNCrew` - Cast and crew details

### 2. **ContentCard** (`components/rows/ContentCard.tsx`)
Individual card component with:
- Responsive poster image (9:13.5 aspect ratio for PORTRAIT posters)
- Hover effects with fade overlay
- Title, description, genre, and rating display
- Link to detail page (`/movie/{objectid}`)

### 3. **ContentSlider** (`components/rows/ContentSlider.tsx`)
Swiper carousel with:
- **Responsive breakpoints:**
  - Mobile: 1 card
  - Tablet (640px): 2 cards
  - Desktop (1024px): 3 cards
  - Large Desktop (1280px): 4 cards
- Navigation arrows (prev/next)
- Pagination dots
- Smooth transitions and hover effects

### 4. **Content Detail Page** (`app/[locale]/movie/[slug]/page.tsx`)
Single content page displaying:
- Large poster image
- Title, rating, genre, year
- Full description
- Cast information
- Additional metadata (duration, language, quality)
- Play button for video player integration

## Usage

### Basic Setup
```tsx
import ContentSlider from "@/components/rows/ContentSlider";
import { Content } from "@/types/content";

export default function MoviePage({ contents }: { contents: Content[] }) {
  return (
    <div>
      <ContentSlider title="Popular Movies" contents={contents} />
    </div>
  );
}
```

### Fetching Data
Use the provided API helper functions:

```tsx
import { fetchContents } from "@/lib/api";

useEffect(() => {
  const loadContents = async () => {
    const data = await fetchContents();
    setContents(data);
  };
  loadContents();
}, []);
```

### API Configuration
Set your API base URL in `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
```

Update the API endpoints in `lib/api.ts`:
- `fetchContents()` - Get all content
- `fetchContentById(id)` - Get single content by ID
- `fetchContentsByGenre(genre)` - Get content by genre

## Customization

### Responsive Breakpoints
Edit `ContentSlider.tsx` breakpoints:
```tsx
breakpoints={{
  640: { slidesPerView: 2, spaceBetween: 12 },
  1024: { slidesPerView: 3, spaceBetween: 16 },
  1280: { slidesPerView: 4, spaceBetween: 20 },
}}
```

### Card Styling
Modify `ContentCard.tsx` for custom overlap, shadows, text styling, etc.

### Navigation
- Custom arrow buttons with SVG icons
- Pagination dots with dynamic bullets
- Customize colors and sizes in Tailwind classes

## File Structure
```
vlive-app/
├── types/
│   └── content.ts           # Content interfaces
├── lib/
│   └── api.ts               # API helper functions
├── components/
│   └── rows/
│       ├── ContentCard.tsx  # Individual card
│       └── ContentSlider.tsx # Carousel wrapper
├── app/
│   └── [locale]/
│       └── movie/
│           ├── page.tsx     # Movie listing page
│           └── [slug]/
│               └── page.tsx # Single content detail page
```

## Features
✅ TypeScript support with full type safety  
✅ Responsive design (1-4 cards per view)  
✅ Swiper.js carousel with navigation  
✅ Hover effects and smooth transitions  
✅ Poster image optimization with Next.js Image  
✅ Automatic image fallback to placeholder  
✅ Dark mode support  
✅ Dynamic routing to content details  
✅ API integration ready  
✅ Accessibility features (aria-labels, semantic HTML)  

## Next Steps
1. Set up your API endpoint URL in `.env.local`
2. Update API functions in `lib/api.ts` with your actual endpoints
3. Replace mock data in `app/[locale]/movie/page.tsx` with `fetchContents()` call
4. Implement video player in detail page
5. Add watchlist functionality
6. Connect cast/crew information to detail page
