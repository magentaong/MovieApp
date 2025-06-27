import Search from './Components/Search.jsx'
import Loader from './Components/Loader.jsx'
import MovieCard from './Components/MovieCard.jsx'
import {useState, useEffect} from 'react'
import {useDebounce} from 'react-use'
import { updateSearchCount, getTrendingMovies } from './appwrite.js'

import React from 'react'


const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

 useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  
  const fetchMovies = async( query ='', page = 1) => {
    setIsLoading(true);
    setErrorMessage('')
    try{
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
      const response = await fetch(endpoint,API_OPTIONS);
      
      if(!response.ok) {
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json();

      console.log(data)
      if (data.Response === 'false'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([])
        return;
      }

      setMovieList(prev =>
      page === 1 ? data.results : [...prev, ...data.results]
    );
      if(query && data.results.length > 0 ){
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error Fetching Movies, Please Try Again Later')
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect( () => {
    setCurrentPage(1);
    fetchMovies(debouncedSearchTerm, 1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper"> 
         <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />  
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <>
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
            {movieList.length > 0 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    const nextPage = currentPage + 1;
                    setCurrentPage(nextPage);
                    fetchMovies(debouncedSearchTerm, nextPage);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
        </section>
      </div>
    </main>
  )
}

export default App