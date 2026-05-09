🎬 MOVIEport - Netflix Style Video Streaming App
A premium, high-performance Video Streaming UI built with React, Vite, and Tailwind CSS. Inspired by Netflix and MovieBox, featuring Glassmorphism UI, unlimited TMDB integration, and a responsive sidebar layout.

🚀 Live Demo
👉 Click here to visit the Live App

✨ Key Features
🎬 Auto-Sliding Hero Carousel: Netflix-style banner that auto-plays with smooth transitions.
🌌 Glassmorphism UI: Premium movie cards with blurred glass effects and animated red blob (Inspired by Uiverse).
📺 Unlimited TMDB API: Integrated The Movie Database API for unlimited, fast, and high-resolution movie/TV show data.
▶️ YouTube Trailer Embed: Watch movie trailers directly inside the app without redirecting.
🔍 Debounced Search: Optimized API calls with 500ms delay to reduce server load.
❤️ Persistent Watchlist: Add to favorites using Context API & LocalStorage (Survives page refresh).
📱 Fully Responsive: Mobile Hamburger Top Bar & Desktop Sidebar layout.
⚡ Performance Optimized: Lazy Loading (Code Splitting) & Skeleton Shimmers for better UX.
🔔 Custom Toast Notifications: Beautiful popups instead of browser alerts.
📺 Dedicated TV Shows Page: Separate categorized page for TV series.
🛠️ Tech Stack
Frontend: React, Vite
Styling: Tailwind CSS, Glassmorphism UI
State Management: Context API
API: TMDB (The Movie Database)
Routing: React Router DOM v6
Deployment: Vercel
🚀 How to Run Locally
If you want to run this project on your own machine:

Clone the repository:
git clone https://github.com/nida-shaikh/MOVIEport-Netflix-Clone.git
Go to the project folder:
bash

cd MOVIEport-Netflix-Clone
Install dependencies:
bash

npm install
Get your TMDB API Key:
Go to TMDB Website, create a free account.
Go to Settings -> API -> Request an API key (Developer).
Copy your API Key (v3 auth).
Add your API key in src/utils/axios.js:
javascript

params: {
  api_key: "YOUR_TMDB_API_KEY_HERE",
  language: "en-US",
}
Start the server:
bash

npm run dev
📸 Screenshots
(Optional: You can add your app screenshots here later to make it look even more professional!)

Made with ❤️ by Nida Shaikh

text


---

### 🚀 Final Push Karo

Save karke terminal mein ye dalo:

```bash
git add .
bash

git commit -m "Updated final live link in README"
bash

git push
💼 CV Ke Liye Final Format (Updated Link)
MOVIEport | React, Tailwind CSS, TMDB API

Built a high-performance Netflix-style streaming UI featuring an auto-sliding carousel, Glassmorphism UI cards, and a responsive MovieBox-style sidebar layout.
Integrated TMDB REST API with Debounced Search and Pagination for optimized and unlimited data fetching.
Implemented a persistent Watchlist using Context API & LocalStorage, and embedded YouTube Trailers dynamically within the app.
Optimized performance using Lazy Loading (Code Splitting) and Custom Toast Notifications for enhanced UX.
Live Link: https://movi-eport-netflix-clone-5mcb.vercel.app/
GitHub: https://github.com/nida-shaikh/MOVIEport-Netflix-Clone
