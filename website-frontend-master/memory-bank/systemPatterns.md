# System Patterns - Churan Chacha Website

## Architecture Overview

### Core Architecture Pattern
The application follows a **comprehensive content management architecture** with unified state management across multiple content types:

```
Frontend (Next.js 15)
├── App Router (JavaScript only)
├── Redux Saga Store (6 content stores)
├── Zustand Cart Store (isolated cart state)
├── Tailwind CSS (utility-first styling)
└── Component Architecture (embedded approach)

Backend APIs (Node.js/Express + MongoDB)
├── Products API (http://localhost:7500/api/products)
├── Comics API (http://localhost:7500/api/comics)
├── Audio Stories API (http://localhost:7500/api/audiostories)
├── Videos API (http://localhost:7500/api/videos)
├── Customer Stories API (http://localhost:7500/api/customerstories)
└── Competitions API (http://localhost:7500/api/competitions)
```

## Key Technical Decisions

### 1. Comprehensive Redux Saga Implementation
**Decision**: Implement complete Redux Saga stores for all content types
**Rationale**: 
- Unified state management across all content
- Consistent error handling and retry logic
- Scalable architecture for future content types
- Centralized data loading strategy

**Implementation**:
```javascript
// 6 Complete Stores
store/
├── products/     (e-commerce functionality)
├── comics/       (comic content management)
├── audioStories/ (audio content management)
├── videos/       (video content management)
├── customerStories/ (user-generated content)
└── competitions/ (competition management)
```

### 2. Unified Data Loading Strategy
**Decision**: Load all application data on app startup via Header component
**Rationale**:
- Single entry point for data initialization
- Parallel loading for optimal performance
- Immediate data availability throughout app
- Simplified component logic (no individual loading states)

**Implementation**:
```javascript
// Header component useEffect
useEffect(() => {
  // Load all content types simultaneously
dispatch(fetchProducts());
dispatch(fetchComics());
dispatch(fetchAudioStories());
dispatch(fetchVideos());
dispatch(fetchCustomerStories());
dispatch(fetchCompetitions());
// ... and all specialized endpoints
}, [dispatch]);
```

### 3. No Loading States Pattern
**Decision**: Eliminate loading indicators throughout the application
**Rationale**:
- Cleaner user interface
- Reduced complexity in components
- Better user experience with instant data access
- Simplified state management

### 4. Embedded Components Architecture
**Decision**: Embed component functionality within page files
**Rationale**:
- Simplified file structure
- Reduced component coupling
- Easier maintenance for single-purpose components
- Better performance with fewer file imports

**Implementation**:
```javascript
// Pages with embedded components
app/
├── page.js           (homepage with all sections embedded)
├── shop/page.js      (shop with ProductCard embedded)
├── about/page.js     (about with all sections embedded)
├── competition/page.js (competition listing embedded)
└── competition/[slug]/page.js (detail with form embedded)
```

### 5. Consistent API Service Pattern
**Decision**: Standardized API service layer across all content types
**Rationale**:
- Consistent error handling
- Unified retry logic (3 attempts with exponential backoff)
- Standardized response normalization
- Easy maintenance and debugging

### 6. Font System Pattern
**Decision**: Implement centralized font management via Tailwind configuration
**Rationale**:
- Consistent typography across entire application
- Performance optimization by eliminating inline styles
- Maintainable central font management
- Better CSS bundling and optimization

**Implementation**:
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

// Usage pattern throughout application
<h1 className="font-heading">Comic Sans heading</h1>
<p className="font-body">Montserrat body text</p>
```

### 7. Custom Component Integration Pattern
**Decision**: Implement custom SVG components within existing carousel libraries
**Rationale**:
- Enhanced visual control over UI elements
- Better brand integration with custom assets
- Improved accessibility with proper ARIA labels
- Consistent styling with Tailwind classes

**Implementation**:
```javascript
// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button 
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-30 h-30 bg-opacity-70 hover:bg-opacity-90 rounded-full"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <Image src="/HeroBanner/left.svg" alt="Previous" width={30} height={30} />
  </button>
);
```

### 8. Full-Width Layout Pattern
**Decision**: Use CSS techniques to break out of container constraints
**Rationale**:
- True full-width displays when needed
- Maintains container structure for other content
- Responsive design compatibility
- Cross-browser consistency

**Implementation**:
```javascript
// Full-width breakout technique
<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
  <Component />
</div>
```

### 9. Video Integration Pattern
**Decision**: Implement autoplay video with full-width display for engaging content
**Rationale**:
- Enhanced user engagement with motion content
- Modern web design standards
- Brand storytelling opportunities
- Mobile-optimized video playback

**Implementation**:
```javascript
// About Us hero video implementation
<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-8">
  <video
    src="/aboutUs/1.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-[50vh] md:h-[80vh] object-contain"
  />
</div>
```

### 10. Interactive Tab System Pattern
**Decision**: Implement tab-based content organization for information-heavy pages
**Rationale**:
- Better content organization and digestibility
- Enhanced user experience with interactive elements
- Reduced page length while maintaining comprehensive information
- Modern UI/UX standards

**Implementation**:
```javascript
// Tab system with useState management
const [activeTab, setActiveTab] = useState('introduction');

const tabs = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'whoWeAre', label: 'Who We Are' },
  // ... more tabs
];

// Dynamic content display based on active tab
{tabs.map(tab => (
  <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={`px-6 py-3 rounded-lg font-body text-sm transition-all duration-300 ${
      activeTab === tab.id
        ? 'bg-primary-10 text-white shadow-lg'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {tab.label}
  </button>
))}
```

### 11. FAQ Accordion Pattern
**Decision**: Implement accordion-style FAQ sections for better content organization
**Rationale**:
- Better space utilization on pages with multiple questions
- Enhanced user experience with single-answer visibility
- Improved content scannability and organization
- Consistent interaction pattern across similar pages

**Implementation**:
```javascript
// FAQ Accordion with single answer display
const [openFAQ, setOpenFAQ] = useState(null);

const toggleFAQ = (index) => {
  setOpenFAQ(openFAQ === index ? null : index);
};

const faqData = [
  {
    question: "Question text",
    answer: "Answer text"
  },
  // ... more FAQ items
];

// Dynamic content display with chevron icons
<div className="space-y-4 max-w-4xl mx-auto">
  {faqData.map((faq, index) => (
    <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => toggleFAQ(index)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <h3 className="font-heading text-xl text-primary-10">{faq.question}</h3>
        {openFAQ === index ? (
          <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="h-5 w-5 text-primary-600 flex-shrink-0 ml-4" />
        )}
      </button>
      {openFAQ === index && (
        <div className="px-6 pb-4">
          <p className="font-body text-gray-700">{faq.answer}</p>
        </div>
      )}
    </div>
  ))}
</div>
```

## Design Patterns

### 1. Content Store Pattern
Each content type follows identical structure:

```javascript
// Action Types Pattern
export const FETCH_[CONTENT]_REQUEST = 'FETCH_[CONTENT]_REQUEST';
export const FETCH_[CONTENT]_SUCCESS = 'FETCH_[CONTENT]_SUCCESS';
export const FETCH_[CONTENT]_FAILURE = 'FETCH_[CONTENT]_FAILURE';

// Reducer Pattern
const initialState = {
  [content]: [],
  featured[Content]: [],
  searchResults: { results: [], query: '' },
  current[Content]: null,
  error: { /* granular error states */ }
};

// Saga Pattern with Retry Logic
function* fetch[Content]Saga() {
  try {
    const response = yield call(apiService.getAll[Content]);
    const data = normalize[Content]Data(response);
    yield put(actions.fetch[Content]Success(data));
  } catch (error) {
    yield put(actions.fetch[Content]Failure(error.message));
  }
}
```

### 2. API Service Pattern
Standardized service layer for all content types:

```javascript
const apiService = {
  async getAll[Content](filters = {}) {
    return fetchWithRetry(`${API_BASE_URL}${queryString}`);
  },
  async getFeatured[Content]() {
    return fetchWithRetry(`${API_BASE_URL}/featured`);
  },
  async search[Content](query, limit) {
    return fetchWithRetry(`${API_BASE_URL}?search=${query}&limit=${limit}`);
  },
  async get[Content]BySlug(slug) {
    return fetchWithRetry(`${API_BASE_URL}/slug/${slug}`);
  }
};
```

### 3. Error Handling Pattern
Consistent error handling across all content types:

```javascript
// Retry Logic with Exponential Backoff
async function fetchWithRetry(url, options = {}, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

### 4. State Normalization Pattern
Consistent data structure across all content types:

```javascript
// Response Normalization
function normalize[Content]Data(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return Array.isArray(apiResponse.data) 
      ? apiResponse.data 
      : [apiResponse.data];
  }
  return [];
}
```

### 5. Page Structure Pattern
Consistent page organization for all major pages:

```javascript
// Standard page structure
export default function PageName() {
  // State management
  const [localState, setLocalState] = useState();
  const globalState = useSelector(state => state.contentType);
  
  // Embedded components (if needed)
  const EmbeddedComponent = ({ props }) => {
    // Component logic
    return <div>Component JSX</div>;
  };
  
  // Main page render
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Hero content */}
      </section>
      
      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        {/* Page content */}
      </div>
    </div>
  );
}
```

## Component Relationships

### 1. Data Flow Architecture
```
Header Component (Data Loader)
├── Dispatches all content actions on mount
├── Triggers parallel API calls for all content types
└── Provides global data initialization

Page Components (Data Consumers)
├── useSelector to access Redux state
├── No individual data fetching
└── Immediate access to all content

Cart System (Isolated State)
├── Zustand store for cart operations
├── Independent of content state
└── Integrated with product data
```

### 2. Content Type Specializations

#### Products Store
- **E-commerce Focus**: Trial packs, combos, individual products
- **Cart Integration**: Direct integration with Zustand cart
- **Specialized Endpoints**: Categories, featured, search, by-slug

#### Comics Store
- **Content Focus**: Comics, moods, ages, comic of month
- **Specialized Endpoints**: Mood filtering, age categories
- **Features**: Featured comics, monthly highlights

#### Audio Stories Store
- **Audio Focus**: Stories, narrators, age categories
- **Specialized Endpoints**: By-narrator filtering
- **Features**: Featured stories, narrator-based organization

#### Videos Store
- **Video Focus**: Videos, presenters, duration sorting
- **Specialized Endpoints**: By-presenter, by-duration
- **Features**: Duration-based sorting (asc/desc)

#### Customer Stories Store
- **User Content Focus**: Customer stories, authors
- **Specialized Endpoints**: By-author filtering
- **Features**: Featured customer stories, author organization

#### Competitions Store
- **Competition Focus**: Active, upcoming, completed competitions
- **Specialized Endpoints**: By-status filtering, featured competitions
- **Features**: Competition registration, participant tracking, status management

### 3. Cross-Content Integration
```javascript
// Unified Search Capability
const searchAllContent = (query) => {
  dispatch(searchProducts(query));
  dispatch(searchComics(query));
  dispatch(searchAudioStories(query));
  dispatch(searchVideos(query));
  dispatch(searchCustomerStories(query));
  dispatch(searchCompetitions(query));
};
```

### 4. Page-Specific Patterns

#### About Us Page Pattern
- **Video Hero**: Full-width autoplay video with mobile optimization
- **Interactive Tabs**: Tab-based content organization for complex information
- **Team Hierarchy**: Size-differentiated display (founders vs team members)
- **Values Display**: Grid-based cards with custom icons and consistent sizing
- **Affiliations**: Circular logo display with hover effects

#### Competition Pages Pattern
- **Listing Page**: Active and upcoming competitions with filtering
- **Detail Page**: Comprehensive competition information with registration
- **Registration Form**: Dynamic team member management with validation
- **Status Management**: Visual indicators for competition states

#### B2B and Contact Us Pages Pattern
- **FAQ Accordion**: Interactive Q&A sections with single-answer visibility
- **Form Integration**: Contact forms with consistent styling and validation
- **Business Focus**: B2B-specific content and partnership information
- **Consistent Layout**: Same typography and design patterns as other pages
- **Responsive Design**: Mobile-first approach with proper breakpoints

## Performance Patterns

### 1. Parallel Data Loading
- All content types loaded simultaneously on app startup
- No sequential loading dependencies
- Optimal time-to-interactive

### 2. Memory Efficiency
- Single data load per content type
- No redundant API calls
- Cached data in Redux store

### 3. Error Isolation
- Independent error states per content type
- Failure in one content type doesn't affect others
- Graceful degradation

### 4. Image Optimization
- Next.js Image component with optimization
- Error fallbacks for missing images
- Responsive image sizing
- Lazy loading for better performance

## Security Patterns

### 1. API Security
- Consistent error handling prevents information leakage
- Proper URL encoding for search parameters
- Standardized response validation

### 2. Client-Side Security
- No sensitive data in Redux state
- Proper error boundary implementation
- Secure image loading with fallbacks

### 3. Video Security
- Local video assets only (no remote video URLs)
- Proper video attributes for security (muted, playsInline)
- No user-controlled video sources

## Scalability Patterns

### 1. Content Type Extensibility
- Easy addition of new content types
- Consistent pattern for new stores
- Standardized API integration

### 2. Feature Extensibility
- Modular component architecture
- Consistent state management patterns
- Reusable API service patterns

### 3. Performance Scalability
- Code splitting ready for content pages
- Lazy loading patterns for images and videos
- Optimized bundle size management

### 4. UI Scalability
- Reusable tab system pattern
- Consistent card design system
- Flexible grid layouts for different content types

## Testing Patterns

### 1. Redux Testing Strategy
```javascript
// Action Testing
test('should create fetch action', () => {
  expect(fetchProducts()).toEqual({
    type: 'FETCH_PRODUCTS_REQUEST'
  });
});

// Reducer Testing
test('should handle fetch success', () => {
  const action = { type: 'FETCH_PRODUCTS_SUCCESS', payload: [] };
  expect(reducer(initialState, action)).toEqual(expectedState);
});

// Saga Testing
test('should fetch products', () => {
  const generator = fetchProductsSaga();
  expect(generator.next().value).toEqual(call(apiService.getAllProducts));
});
```

### 2. Component Testing Strategy
- Test Redux integration with mock store
- Test error state handling
- Test responsive behavior
- Test interactive elements (tabs, forms)

### 3. Integration Testing Strategy
- Test complete data flow from API to UI
- Test error recovery mechanisms
- Test cross-content functionality
- Test video playback and performance

## Development Patterns

### 1. Code Organization
```
app/                 (Next.js pages)
├── page.js         (homepage with embedded components)
├── shop/           (product pages)
├── about/          (company information page)
├── b2b/            (B2B partnerships page)
├── contact-us/     (contact information page)
├── competition/    (competition pages)
└── [content]/      (future content pages)

components/         (reusable components)
├── Header.js       (data loader + navigation)
├── cart/           (cart-specific components)
└── providers/      (Redux provider wrapper)

store/              (complete state management)
├── [contentType]/ (individual content stores)
├── rootReducer.js (combines all reducers)
└── rootSaga.js    (forks all sagas)
```

### 2. Development Workflow
1. **Content Store Creation**: Follow established pattern
2. **API Integration**: Use standardized service layer
3. **Component Integration**: Use Redux hooks for data access
4. **Error Handling**: Implement consistent error patterns
5. **Testing**: Follow established testing patterns

### 3. Debugging Patterns
- Redux DevTools for state inspection
- Console logging for API errors
- Consistent error message formatting
- Performance monitoring hooks

### 4. Page Development Pattern
1. **Structure Planning**: Define sections and layout
2. **State Integration**: Connect to appropriate Redux stores
3. **Component Embedding**: Implement components within page file
4. **Responsive Design**: Mobile-first approach
5. **Error Handling**: Implement graceful fallbacks
6. **Testing**: Manual and automated testing

This system patterns documentation provides the foundation for understanding and extending the Churan Chacha website architecture with its comprehensive content management system, including the newly implemented About Us page and all established patterns for future development. 