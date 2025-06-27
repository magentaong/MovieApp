# 🎬 MovieApp

Find movies you'll enjoy without the hassle :D

A React-based movie search application that leverages the TMDb API and Appwrite for trending data tracking. Built to explore real-world web app patterns like API integration, debouncing, component structure, and more.

---

## 🚀 Features

-  **Live search with debounce** for optimised querying
- Browse **popular movies** using the TMDb API
- See real-time **trending movies** via Appwrite
- Clean error handling and loading states
- Modular and scalable React component structure
-  Feedback on failed API calls or empty results
-  Search count tracking with a backend (Appwrite)
- Load More Button to dynamically fetch more results :O

---

## 🧠 What I Learned

This project was built to deeply understand key frontend concepts:

1. **React Hooks**  
   - `useState`, `useEffect` for dynamic UI and lifecycle logic  
2. **Component Design**  
   - Created reusable components like `<Search />`, `<Loader />`, `<MovieCard />`  
3. **Appwrite Integration**  
   - Used Appwrite as a simple backend to store and retrieve trending movie data  
4. **Debounce Optimization**  
   - Used `useDebounce` from `react-use` to reduce API calls while typing  
5. **API Handling**  
   - Fetched movie data from TMDb, handled pagination, and dynamically updated lists  
6. **Robust Error Catching**  
   - Gracefully managed failed network requests and empty search results

---

## 🛠 Tech Stack

| Tech        | Usage                           |
|-------------|----------------------------------|
| **React**   | UI and component logic          |
| **Vite**    | Fast bundling and dev server    |
| **Tailwind CSS** | Styling and responsive layout |
| **TMDb API**| Movie data search & discovery   |
| **Appwrite**| Backend for trending logic      |
| **react-use** | `useDebounce` hook for search performance |

---

## 📁 Project Structure (Simplified)

```bash
├── public/
│   └── hero.png
├── src/
│   ├── Components/
│   │   ├── Search.jsx
│   │   ├── Loader.jsx
│   │   └── MovieCard.jsx
│   ├── appwrite.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── vite.config.js
└── README.md
```

## 🔧 Setup & Installation
```
git clone https://github.com/magentaong/MovieApp.git
cd MovieApp
npm install
npm run dev
```

🛑 Don't forget to add your own .env file with your TMDb API key:
```
VITE_TMDB_API_KEY= 
VITE_APPWRITE_PROJECT_ID= 
VITE_APPWRITE_DATABASE_ID= 
VITE_APPWRITE_COLLECTION_ID= 
```
--- 
## 📸 Demo
<img width="1085" alt="Demo of movie" src="https://github.com/user-attachments/assets/e6f22f28-19f6-43d9-bc2d-169be91c49ea" />

---

## Future Improvements

- **Genre & Year Filtering**  
  Add dropdowns or checkboxes to filter movies by genre, release year, or rating.

- **Sort Options**  
  Allow users to sort by popularity, release date, or average rating.

-  **Favorites System**  
  Let users "like" movies and save them to local storage or Appwrite collections.

- **Movie Details Modal/Page**  
  Click a movie to view more details like synopsis, cast, trailer links, etc.

- **Unit Testing with Jest/React Testing Library**  
  Write tests for components like `Search`, `MovieCard`, and `Loader`.


## 🙏 Acknowledgments
- [JSMastery](https://www.youtube.com/watch?v=dCLhUialKPQ&ab_channel=JavaScriptMastery)
    - I followed this tutorial and added custom features like loading overlay for better UX, and movie pagination :)
- [The Movie Database (TMDb)](https://www.themoviedb.org/)
- [Appwrite](https://appwrite.io/)
- [react-use](https://github.com/streamich/react-use)

