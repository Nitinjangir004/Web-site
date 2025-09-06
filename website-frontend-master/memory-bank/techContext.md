# Tech Context - Churan Chacha Website

## Technology Stack

### Frontend Framework
- **Next.js 15**: React framework with App Router
- **React 18**: Component library with hooks
- **JavaScript (ES6+)**: No TypeScript, pure JavaScript implementation

### State Management
- **Redux Toolkit**: Core Redux implementation
- **Redux Saga**: Middleware for complex async operations and side effects
- **Zustand**: Lightweight state management for cart functionality
- **React-Redux**: React bindings for Redux

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework with custom font configuration
- **Custom Typography**: Comic Sans MS for headings, Montserrat for body text
- **Lucide React**: Icon library for consistent iconography
- **CSS Modules**: Component-scoped styling where needed
- **Responsive Design**: Mobile-first approach
- **Custom SVG Integration**: Brand-specific navigation and UI elements

### Development Tools
- **Redux DevTools**: State debugging and inspection
- **ESLint**: Code linting and formatting
- **Next.js DevTools**: Development optimization

## Dependencies Overview

### Core Dependencies
```json
{
  "next": "15.0.3",
  "react": "^18",
  "react-dom": "^18",
  "@reduxjs/toolkit": "^2.2.7",
  "redux-saga": "^1.3.0",
  "react-redux": "^9.1.2",
  "zustand": "^5.0.0",
  "tailwindcss": "^3.4.1",
  "lucide-react": "^0.263.1"
}
```

### Development Dependencies
```json
{
  "eslint": "^8",
  "eslint-config-next": "15.0.3",
  "postcss": "^8",
  "autoprefixer": "^10.0.1"
}
```

## Architecture Components

### Complete Redux Store Architecture
```
store/
├── index.js                    # Main store configuration with Redux Saga middleware
├── rootReducer.js             # Combines all 6 content reducers
├── rootSaga.js               # Forks all 6 content sagas
├── products/                 # E-commerce product management
│   ├── productActionTypes.js # Product action constants
│   ├── productActions.js     # Product action creators
│   ├── productReducer.js     # Product state management
│   └── productSaga.js        # Product API calls and side effects
├── comics/                   # Comic content management
│   ├── comicActionTypes.js   # Comic action constants
│   ├── comicActions.js       # Comic action creators
│   ├── comicReducer.js       # Comic state management
│   └── comicSaga.js          # Comic API calls and side effects
├── audioStories/             # Audio story content management
│   ├── audioStoryActionTypes.js # Audio story action constants
│   ├── audioStoryActions.js     # Audio story action creators
│   ├── audioStoryReducer.js     # Audio story state management
│   └── audioStorySaga.js        # Audio story API calls and side effects
├── videos/                   # Video content management
│   ├── videoActionTypes.js   # Video action constants
│   ├── videoActions.js       # Video action creators
│   ├── videoReducer.js       # Video state management
│   └── videoSaga.js          # Video API calls and side effects
├── customerStories/          # Customer story content management
│   ├── customerStoryActionTypes.js # Customer story action constants
│   ├── customerStoryActions.js     # Customer story action creators
│   ├── customerStoryReducer.js     # Customer story state management
│   └── customerStorySaga.js        # Customer story API calls and side effects
└── competition/             # Competition content management
    ├── competitionActionTypes.js # Competition action constants
    ├── competitionActions.js     # Competition action creators
    ├── competitionReducer.js     # Competition state management
    └── competitionSaga.js        # Competition API calls and side effects
```

### Backend API Integration
```
Backend APIs (Node.js/Express + MongoDB)
├── Products API: http://localhost:7500/api/products
│   ├── GET / (all products with filters)
│   ├── GET /featured (featured products)
│   ├── GET /search (search products)
│   ├── GET /categories (product categories)
│   └── GET /:slug (product by slug)
├── Comics API: http://localhost:7500/api/comics
│   ├── GET / (all comics with filters)
│   ├── GET /featured (featured comics)
│   ├── GET /comic-of-month (monthly featured comic)
│   ├── GET /moods (comic moods)
│   ├── GET /ages (age categories)
│   ├── GET /search (search comics)
│   └── GET /slug/:slug (comic by slug)
├── Audio Stories API: http://localhost:7500/api/audiostories
│   ├── GET / (all audio stories)
│   ├── GET /featured (featured stories)
│   ├── GET /narrators (all narrators)
│   ├── GET /ages (age categories)
│   ├── GET /by-narrator/:narrator (stories by narrator)
│   ├── GET /search (search stories)
│   └── GET /slug/:slug (story by slug)
├── Videos API: http://localhost:7500/api/videos
│   ├── GET / (all videos)
│   ├── GET /featured (featured videos)
│   ├── GET /presenters (all presenters)
│   ├── GET /ages (age categories)
│   ├── GET /by-presenter/:presenter (videos by presenter)
│   ├── GET /by-duration (sorted by duration)
│   ├── GET /search (search videos)
│   └── GET /slug/:slug (video by slug)
├── Customer Stories API: http://localhost:7500/api/customerstories
│   ├── GET / (all customer stories)
│   ├── GET /featured (featured stories)
│   ├── GET /authors (all authors)
│   ├── GET /by-author/:author (stories by author)
│   ├── GET /search (search stories)
│   └── GET /slug/:slug (story by slug)
└── Competitions API: http://localhost:7500/api/competitions
    ├── GET / (all competitions with filters)
    ├── GET /featured (featured competitions)
    ├── GET /active (active competitions)
    ├── GET /upcoming (upcoming competitions)
    ├── GET /slug/:slug (competition by slug)
    ├── GET /statuses (competition statuses)
    ├── GET /by-status/:status (competitions by status)
    ├── GET ?search=query (search competitions)
    ├── POST / (create competition)
    ├── PUT /:id (update competition)
    ├── PATCH /:id/participants (update participants)
    └── DELETE /:id (delete competition)
```

## Development Setup

### Environment Configuration
```bash
# Development server
npm run dev          # Starts Next.js development server on port 3000

# Build process
npm run build        # Creates production build
npm run start        # Starts production server

# Code quality
npm run lint         # Runs ESLint for code quality
```

### Required Environment Variables
```env
# Development
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:7500

# Image Configuration (for Next.js Image component)
NEXT_PUBLIC_IMAGE_DOMAINS=localhost:7500
```

### Next.js Configuration
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '7500',
        pathname: '/**',
      },
    ],
  },
};
```

## Technical Constraints

### Language Constraints
- **JavaScript Only**: No TypeScript usage throughout the project
- **ES6+ Features**: Modern JavaScript features for clean code
- **JSX**: React component syntax

### Performance Constraints
- **Bundle Size**: Monitor Redux Saga overhead with 5 content stores
- **Memory Usage**: Efficient state management with all content types
- **API Calls**: Parallel loading strategy for optimal performance
- **Image Loading**: Next.js Image optimization for all content images

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Responsive Design**: Mobile-first approach for all screen sizes

### Development Constraints
- **No Loading States**: Clean UI without loading indicators
- **Embedded Components**: Single-file component approach where possible
- **Error Handling**: Silent error handling with console logging
- **Retry Logic**: 3-attempt retry with exponential backoff for all APIs

## API Integration Details

### Request/Response Pattern
```javascript
// Standard API Request
const response = await fetch(`${API_BASE_URL}/endpoint`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Standard API Response
{
  "success": true,
  "data": [...], // Array or single object
  "message": "Success message",
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

### Error Handling Pattern
```javascript
// Retry Logic Implementation
async function fetchWithRetry(url, options = {}, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API call attempt ${i + 1} failed:`, error);
      if (i === attempts - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

## State Management Architecture

### Redux Store Configuration
```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
```

### Content Store Pattern
Each content store follows identical structure:
```javascript
// Action Types
export const FETCH_[CONTENT]_REQUEST = 'FETCH_[CONTENT]_REQUEST';
export const FETCH_[CONTENT]_SUCCESS = 'FETCH_[CONTENT]_SUCCESS';
export const FETCH_[CONTENT]_FAILURE = 'FETCH_[CONTENT]_FAILURE';

// Initial State
const initialState = {
  [content]: [],
  featured[Content]: [],
  searchResults: { results: [], query: '' },
  current[Content]: null,
  error: { /* granular error states */ }
};

// Saga with API Integration
function* fetch[Content]Saga() {
  try {
    const response = yield call(apiService.getAll[Content]);
    const data = normalize[Content]Data(response);
    yield put(actions.fetch[Content]Success(data));
  } catch (error) {
    console.error(`Failed to fetch ${content} after 3 attempts:`, error);
    yield put(actions.fetch[Content]Failure(error.message));
  }
}
```

## Performance Optimization

### Data Loading Strategy
- **Parallel Loading**: All content types fetched simultaneously on app startup
- **Single Entry Point**: Header component triggers all data loading
- **Memory Efficiency**: All data loaded once and cached in Redux store
- **No Redundant Calls**: Each content type fetched only once per session

### Bundle Optimization
- **Code Splitting**: Ready for implementation on content pages
- **Tree Shaking**: Unused code elimination
- **Dynamic Imports**: For heavy components (future implementation)
- **Asset Optimization**: Next.js automatic optimization

### Image Optimization
- **Next.js Image Component**: Automatic optimization and lazy loading
- **Remote Patterns**: Configured for backend image domains
- **Fallback Handling**: Error states for failed image loads
- **Responsive Images**: Multiple sizes for different screen sizes

## Security Considerations

### Client-Side Security
- **No Sensitive Data**: No API keys or secrets in client code
- **Input Validation**: Proper validation for search queries and user inputs
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection

### API Security
- **Error Handling**: Consistent error responses without information leakage
- **URL Encoding**: Proper encoding for search parameters and special characters
- **Request Validation**: Backend validation for all API requests
- **Rate Limiting**: Backend rate limiting for API endpoints

## Testing Strategy

### Unit Testing (Future Implementation)
```javascript
// Redux Testing
import { fetchProducts } from './productActions';
import productReducer from './productReducer';

test('should create fetch products action', () => {
  expect(fetchProducts()).toEqual({
    type: 'FETCH_PRODUCTS_REQUEST'
  });
});

test('should handle fetch products success', () => {
  const action = {
    type: 'FETCH_PRODUCTS_SUCCESS',
    payload: []
  };
  expect(productReducer(initialState, action)).toEqual(expectedState);
});
```

### Integration Testing (Future Implementation)
- **API Integration**: Test all 33 API endpoints
- **Redux Saga**: Test complete data flow from API to UI
- **Error Handling**: Test retry logic and error states
- **Cross-Content**: Test unified search functionality

### E2E Testing (Future Implementation)
- **User Journeys**: Complete user flows from homepage to checkout
- **Content Navigation**: Test all content type interactions
- **Cart Functionality**: Test complete cart operations
- **Responsive Design**: Test across different screen sizes

## Deployment Configuration

### Production Build
```bash
# Build optimization
npm run build

# Static export (if needed)
npm run export

# Production server
npm run start
```

### Environment Variables (Production)
```env
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.churanchacha.com
NEXT_PUBLIC_IMAGE_DOMAINS=api.churanchacha.com
```

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Bundle Analysis**: Regular bundle size monitoring
- **API Performance**: Response time tracking for all endpoints
- **Error Tracking**: Production error monitoring and alerting

## Custom Font System

### Typography Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Comic Sans MS', 'cursive'],
        'body': ['Montserrat', 'sans-serif'],
      },
    },
  },
}
```

### Font Usage Pattern
```javascript
// Heading elements (h1, h2, h3, titles)
className="font-heading"  // Comic Sans MS

// Body text, descriptions, UI text
className="font-body"     // Montserrat

// Applied throughout:
// - Product cards and descriptions
// - Section headings and titles
// - Button text and labels
// - Form inputs and placeholders
// - Testimonials and content
```

### Typography Benefits
- **Brand Consistency**: Comic Sans MS reinforces playful, nostalgic brand identity
- **Readability**: Montserrat provides excellent readability for body content
- **Performance**: Centralized font loading and CSS optimization
- **Maintainability**: Single configuration point for all typography
- **Accessibility**: Proper font fallbacks and contrast considerations

## Enhanced UI Components

### Hero Carousel Implementation
```javascript
// Custom SVG Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-30 h-30 bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-300"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <Image src="/HeroBanner/left.svg" alt="Previous" width={30} height={30} className="w-16 h-16" />
  </button>
);

// Full-width carousel container
<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] aspect-[16/7]">
  <HeroCarousel />
</div>
```

### Carousel Features
- **Custom SVG Navigation**: Brand-specific arrow designs (left.svg, right.svg)
- **Enhanced Visibility**: Semi-transparent backgrounds with hover states
- **Full-Width Display**: True end-to-end carousel spanning viewport
- **Responsive Design**: Optimized arrow sizes for different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Height Optimization**: Fixed 80vh height for better mobile experience

This technical context provides comprehensive coverage of all technologies, patterns, and configurations used in the Churan Chacha website's complete content management system. 