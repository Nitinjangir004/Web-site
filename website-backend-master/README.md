# Churan Chacha Backend API

Backend API for Churan Chacha - Traditional Indian candy e-commerce platform with comics, audio stories, videos, and customer stories content.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd churanchacha-backend
npm install
```

2. **Start the development server**
```bash
npm run dev
```

3. **Seed the database with dummy data**
```bash
# Seed products
npm run seed

# Seed comics
npm run seed:comics

# Seed audio stories
npm run seed:audiostories

# Seed videos
npm run seed:videos

# Seed customer stories
npm run seed:customerstories
```

The server will start on `http://localhost:7500`

## 📦 Project Structure

```
churanchacha-backend/
├── models/
│   ├── Product.js          # Product schema/model
│   ├── Comic.js            # Comic schema/model
│   ├── AudioStory.js       # Audio story schema/model
│   ├── Video.js            # Video schema/model
│   └── CustomerStory.js    # Customer story schema/model
├── routes/
│   ├── products.js         # Product API routes
│   ├── comics.js           # Comic API routes
│   ├── audioStories.js     # Audio stories API routes
│   ├── videos.js           # Videos API routes
│   ├── customerStories.js  # Customer stories API routes
│   └── productImages.js    # Image serving routes
├── data/
│   ├── dummy-products.json # Sample products data
│   ├── dummy-comics.json   # Sample comics data
│   ├── dummy-audio-stories.json # Sample audio stories data
│   ├── dummy-videos.json   # Sample videos data
│   └── dummy-customer-stories.json # Sample customer stories data
├── scripts/
│   ├── seedDatabase.js     # Products seeding script
│   ├── seedComics.js       # Comics seeding script
│   ├── seedAudioStories.js # Audio stories seeding script
│   ├── seedVideos.js       # Videos seeding script
│   └── seedCustomerStories.js # Customer stories seeding script
├── assets/
│   └── product-images/     # Product images directory
├── db.js                   # MongoDB connection
├── index.js                # Main server file
└── package.json
```

## 🛠 API Endpoints

### Base URL: `http://localhost:7500/api`

## Products API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/products` | Get all products | `category`, `featured`, `isTrialPack`, `isCombo`, `stockStatus`, `sort`, `limit`, `page` |
| `GET` | `/products/featured` | Get featured products | - |
| `GET` | `/products/categories` | Get all categories | - |
| `GET` | `/products/search` | Search products | `q` (search query), `limit` |
| `GET` | `/products/:slug` | Get product by slug | - |
| `POST` | `/products` | Create new product | - |
| `PUT` | `/products/:id` | Update product by ID | - |
| `DELETE` | `/products/:id` | Delete product by ID | - |

## Comics API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/comics` | Get all comics | `featured`, `comicOfMonth`, `mood`, `age`, `search`, `sort`, `limit`, `page` |
| `GET` | `/comics/featured` | Get featured comics | - |
| `GET` | `/comics/comic-of-month` | Get comic of the month | - |
| `GET` | `/comics/moods` | Get available mood options | - |
| `GET` | `/comics/ages` | Get available age ranges | - |
| `GET` | `/comics/:id` | Get comic by ID | - |
| `GET` | `/comics/slug/:slug` | Get comic by slug | - |
| `POST` | `/comics` | Create new comic | - |
| `PUT` | `/comics/:id` | Update comic by ID | - |
| `PATCH` | `/comics/:id/comic-of-month` | Set/unset comic of the month | `{ "comicOfMonth": true/false }` |
| `DELETE` | `/comics/:id` | Delete comic by ID | - |

## Audio Stories API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/audiostories` | Get all audio stories | `featured`, `narrator`, `age`, `search`, `sort`, `limit`, `page` |
| `GET` | `/audiostories/featured` | Get featured audio stories | - |
| `GET` | `/audiostories/narrators` | Get available narrators | - |
| `GET` | `/audiostories/ages` | Get available age ranges | - |
| `GET` | `/audiostories/by-narrator/:narrator` | Get stories by narrator | - |
| `GET` | `/audiostories/:id` | Get audio story by ID | - |
| `GET` | `/audiostories/slug/:slug` | Get audio story by slug | - |
| `POST` | `/audiostories` | Create new audio story | - |
| `PUT` | `/audiostories/:id` | Update audio story by ID | - |
| `PATCH` | `/audiostories/:id/featured` | Toggle featured status | `{ "featured": true/false }` |
| `DELETE` | `/audiostories/:id` | Delete audio story by ID | - |

## Videos API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/videos` | Get all videos | `featured`, `presenter`, `age`, `search`, `sort`, `limit`, `page` |
| `GET` | `/videos/featured` | Get featured videos | - |
| `GET` | `/videos/presenters` | Get available presenters | - |
| `GET` | `/videos/ages` | Get available age ranges | - |
| `GET` | `/videos/by-presenter/:presenter` | Get videos by presenter | - |
| `GET` | `/videos/by-duration` | Get videos sorted by duration | `order` (asc/desc) |
| `GET` | `/videos/:id` | Get video by ID | - |
| `GET` | `/videos/slug/:slug` | Get video by slug | - |
| `POST` | `/videos` | Create new video | - |
| `PUT` | `/videos/:id` | Update video by ID | - |
| `PATCH` | `/videos/:id/featured` | Toggle featured status | `{ "featured": true/false }` |
| `DELETE` | `/videos/:id` | Delete video by ID | - |

## Customer Stories API

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| `GET` | `/customerstories` | Get all customer stories | `featured`, `author`, `search`, `sort`, `limit`, `page` |
| `GET` | `/customerstories/featured` | Get featured customer stories | - |
| `GET` | `/customerstories/authors` | Get available authors | - |
| `GET` | `/customerstories/by-author/:author` | Get stories by author | - |
| `GET` | `/customerstories/:id` | Get customer story by ID | - |
| `GET` | `/customerstories/slug/:slug` | Get customer story by slug | - |
| `POST` | `/customerstories` | Create new customer story | - |
| `PUT` | `/customerstories/:id` | Update customer story by ID | - |
| `PATCH` | `/customerstories/:id/featured` | Toggle featured status | `{ "featured": true/false }` |
| `DELETE` | `/customerstories/:id` | Delete customer story by ID | - |

## Image Serving API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/productImages/:productFolder/:imageName` | Serve product images |

### Example Requests

#### Products
```bash
# Get all products with filtering
GET /api/products?category=sweet-tangy&featured=true&limit=5&sort=-price

# Search products
GET /api/products/search?q=imli&limit=3

# Get product by slug
GET /api/products/chatpati-imli
```

#### Comics
```bash
# Get all comics with filtering
GET /api/comics?featured=true&mood=Humorous + Lighthearted&limit=5

# Get comic of the month
GET /api/comics/comic-of-month

# Search comics
GET /api/comics?search=friendship&limit=3

# Get comic by slug
GET /api/comics/slug/the-hope
```

#### Audio Stories
```bash
# Get all audio stories with filtering
GET /api/audiostories?featured=true&narrator=अनिल कपूर&limit=5

# Get featured audio stories
GET /api/audiostories/featured

# Get stories by narrator
GET /api/audiostories/by-narrator/अनिल कपूर

# Search audio stories
GET /api/audiostories?search=चुरन&limit=3

# Get audio story by slug
GET /api/audiostories/slug/churan-chacha-ki-kahani
```

#### Videos
```bash
# Get all videos with filtering
GET /api/videos?featured=true&presenter=Churan Chacha himself&limit=5

# Get featured videos
GET /api/videos/featured

# Get videos by presenter
GET /api/videos/by-presenter/Churan Chacha himself

# Get videos sorted by duration
GET /api/videos/by-duration?order=desc

# Search videos
GET /api/videos?search=kitchen&limit=3

# Get video by slug
GET /api/videos/slug/churan-chachas-kitchen
```

#### Customer Stories
```bash
# Get all customer stories with filtering
GET /api/customerstories?featured=true&author=Rahul&limit=5

# Get featured customer stories
GET /api/customerstories/featured

# Get stories by author
GET /api/customerstories/by-author/Rahul, 8, Mumbai

# Search customer stories
GET /api/customerstories?search=school&limit=3

# Get customer story by slug
GET /api/customerstories/slug/first-churan-adventure
```

#### Images
```bash
# Get product image
GET /api/productImages/chatpati_imli/chatpati_imli_1.png
```

## 📝 Data Schemas

### Product Schema
```javascript
{
  id: Number,              // Unique product ID
  name: String,            // Product name
  description: String,     // Short description
  longDescription: String, // Detailed description
  price: Number,           // Price in rupees
  category: String,        // Product category
  flavor: String,          // Flavor type
  nostalgiaLevel: String,  // Nostalgia level (low/medium/high)
  slug: String,            // URL-friendly identifier
  ingredients: String,     // Ingredients list
  weight: String,          // Weight information
  dietaryInfo: String,     // Dietary information
  stockStatus: String,     // Stock status
  featured: Boolean,       // Is featured product
  isTrialPack: Boolean,    // Is trial pack
  isCombo: Boolean,        // Is combo product
  image: String,           // Main product image
  additionalImages: [String] // Additional product images
}
```

### Comic Schema
```javascript
{
  id: Number,              // Unique comic ID
  title: String,           // Comic title
  subtitle: String,        // Comic subtitle
  image: String,           // Comic cover image
  description: String,     // Comic description
  characters: String,      // Main characters
  themes: String,          // Comic themes
  mood: String,            // Comic mood (enum)
  age: String,             // Target age (e.g., "8+")
  slug: String,            // URL-friendly identifier
  type: String,            // Content type (always "comic")
  featured: Boolean,       // Is featured comic
  comicOfMonth: Boolean    // Is comic of the month (only one can be true)
}
```

### Audio Story Schema
```javascript
{
  id: Number,              // Unique audio story ID
  title: String,           // Audio story title
  subtitle: String,        // Audio story subtitle
  image: String,           // Thumbnail image
  description: String,     // Audio story description
  duration: String,        // Duration (e.g., "12:45")
  narrator: String,        // Narrator name
  age: String,             // Target age (e.g., "7+")
  slug: String,            // URL-friendly identifier
  featured: Boolean,       // Is featured audio story
  audioUrl: String         // Audio file URL
}
```

### Video Schema
```javascript
{
  id: Number,              // Unique video ID
  title: String,           // Video title
  subtitle: String,        // Video subtitle
  image: String,           // Thumbnail image
  description: String,     // Video description
  duration: String,        // Duration (e.g., "8:30")
  presenter: String,       // Presenter name
  age: String,             // Target age (e.g., "10+" or "All ages")
  slug: String,            // URL-friendly identifier
  featured: Boolean,       // Is featured video
  videoUrl: String         // Video URL (YouTube embed, etc.)
}
```

### Customer Story Schema
```javascript
{
  id: Number,              // Unique customer story ID
  title: String,           // Story title
  author: String,          // Story author (name, age, city)
  image: String,           // Story image
  description: String,     // Story description
  slug: String,            // URL-friendly identifier
  featured: Boolean        // Is featured story
}
```

## 🗃 Database Setup

### Using the Seeding Scripts (Recommended)
```bash
# Seed products
npm run seed

# Seed comics
npm run seed:comics

# Seed audio stories
npm run seed:audiostories

# Seed videos
npm run seed:videos

# Seed customer stories
npm run seed:customerstories
```

### Manual Import via MongoDB Compass
1. Open MongoDB Compass
2. Connect to your MongoDB instance
3. Navigate to the `ChuranChacha` database
4. Create collections: `products`, `comics`, `audiostories`, `videos`, and `customerstories`
5. Import JSON files from `data/` directory

### Using MongoDB CLI
```bash
# Import products
mongoimport --db ChuranChacha --collection products --file data/dummy-products.json --jsonArray

# Import comics
mongoimport --db ChuranChacha --collection comics --file data/dummy-comics.json --jsonArray

# Import audio stories
mongoimport --db ChuranChacha --collection audiostories --file data/dummy-audio-stories.json --jsonArray

# Import videos
mongoimport --db ChuranChacha --collection videos --file data/dummy-videos.json --jsonArray

# Import customer stories
mongoimport --db ChuranChacha --collection customerstories --file data/dummy-customer-stories.json --jsonArray
```

## 🏃‍♂️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Start Production | `npm start` | Start the server in production mode |
| Development | `npm run dev` | Start server with nodemon (auto-restart) |
| Seed Products | `npm run seed` | Populate database with dummy products |
| Seed Comics | `npm run seed:comics` | Populate database with dummy comics |
| Seed Audio Stories | `npm run seed:audiostories` | Populate database with dummy audio stories |
| Seed Videos | `npm run seed:videos` | Populate database with dummy videos |
| Seed Customer Stories | `npm run seed:customerstories` | Populate database with dummy customer stories |

## 🎯 Sample Data Included

### Products (7 items)
- **Individual Products**: Trial Pack, Chatpati Imli Candy, Blast of Salt, Goodness of Saunf, Berkoot Candy
- **Combo Products**: 2 combo packs

### Comics (6 items)
1. **The Hope** - Harsh की एडवेंचर यात्रा (Comic of the Month)
2. **The School Bag** - किसके बैग में क्या है?
3. **Secret Door** - Nikki और उसकी Time Travel यात्रा
4. **Best Friend** - Bala और Harsh की अनोखी दोस्ती
5. **Summer Camp** - धूप और मज़े की बातें
6. **Churan Exam** - परीक्षा की तैयारी

### Audio Stories (4 items)
1. **Churan Chacha ki Kahani** - एक अनोखी और मज़ेदार कहानी (Featured)
2. **Vo Yandon Ki Gali** - बचपन की यादों की एक खूबसूरत कहानी (Featured)
3. **गली क्रिकेट का मजा** - बारिश में भीगी गेंद और सपनों का छक्का
4. **Tiffin Box Tales** - When lunch breaks become adventures

### Videos (4 items)
1. **Churan Chacha's Kitchen** - The secret ingredients revealed! (Featured)
2. **School Memories: Batch of 95** - Reunion of the 1995 batch (Featured)
3. **Making of The Hope Comic** - Behind the scenes of our most popular comic
4. **Churan Challenge 2023** - Who can handle the tangiest churan?

### Customer Stories (20 items)
1. **My First Churan Adventure** - Rahul, 8, Mumbai (Featured)
2. **Memories of School Canteen** - Priya, 12, Delhi (Featured)
3. **Churan Party at Home** - The Sharma Family, Jaipur
4. **My Grandmother's Recipe** - Vishal, 30, Kolkata
5. **Churan & Cricket Memories** - Ajay, 14, Chennai
6. **Art with Churan Wrappers** - Meera, 9, Ahmedabad
7. **School Trip & Churan** - Class 5B, DPS School
8. **Birthday Party Churan Bar** - Rohan's Parents, Pune
9. **My Churan Collection** - Aryan, 11, Lucknow
10. **Churan Challenge with Friends** - Neha & Friends, Bangalore
11. **Diwali & Churan Chacha** - Verma Family, Indore
12. **Childhood Churan Adventures** - Rakesh, 35, Hyderabad
13. **Churan & Study Sessions** - Sanya, 16, Gurgaon
14. **Family Movie Night & Churan** - The Malhotra Family, Mumbai
15. **Churan Comic Fan Art** - Deepak, 13, Bhopal
16. **Hostel Friends & Churan** - College Students, Manipal
17. **First Day of School & Churan** - Ananya, 7, Jaipur
18. **Churan Candy Art** - Art Club, St. Mary's School
19. **Picnic Day Churan Memories** - Khanna Family, Chandigarh
20. **Grandparents & Churan Stories** - Riya & Grandparents, Nagpur

## 🔧 Environment Configuration

Update the MongoDB connection string in `db.js` if needed:

```javascript
const mongoURI = "your-mongodb-connection-string";
```

## 📊 Response Format

All API responses follow this format:

```javascript
// Success Response
{
  "success": true,
  "data": [...],
  "pagination": {...} // (for paginated endpoints)
}

// Error Response
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🎨 Special Features

### Comics Management
- **Comic of the Month**: Only one comic can be marked as "Comic of the Month" at a time
- **Automatic Management**: Setting a new comic as "Comic of the Month" automatically unsets the previous one
- **Mood Filtering**: Filter comics by mood categories
- **Age-appropriate Content**: Filter by target age groups

### Audio Stories Management
- **Narrator Filtering**: Filter stories by narrator
- **Duration-based Sorting**: Sort by audio length
- **Featured Content**: Mark important stories as featured
- **Age-appropriate Content**: Filter by target age groups

### Videos Management
- **Presenter Filtering**: Filter videos by presenter
- **Duration Sorting**: Sort videos by duration (ascending/descending)
- **Age Support**: Supports both specific ages ("10+") and "All ages"
- **Featured Content**: Mark important videos as featured
- **YouTube Integration**: Support for YouTube embed URLs

### Customer Stories Management
- **Author Filtering**: Filter stories by author name/location
- **Featured Content**: Mark important customer stories as featured
- **Search Functionality**: Search across title, description, and author
- **Community Content**: Showcase user-generated content and experiences

### Image Serving
- Direct image access via clean URLs
- Proper content-type headers
- Caching headers for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details.

---

**Happy Coding! 🎉**

For questions or support, reach out to the Churan Chacha development team. 