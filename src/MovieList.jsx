import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './card';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/JustBrownKid/data/refs/heads/main/test.json')
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.data)) {
          setMovies(response.data.data);
        } else {
          console.error('Invalid data structure');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="w-16 h-16 border-8 border-dashed border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  const MovieFliter = movies.filter(movie => (movie.title.toLowerCase().includes(searchTerm.toLowerCase())))
  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}

        {/* Search Bar */}
        <div className="relative mb-8">
  <input
    type="text"
    placeholder="Search for a movie..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-14 pr-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 shadow-md hover:shadow-lg"
  />
  <div className="absolute inset-y-0 left-4 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400 hover:text-white transition duration-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
    </svg>
  </div>
</div>

          {MovieFliter.length === 0 ? (  
            <h1 className="text-white text-3xl font text-center mt-5">
            No movie found
          </h1>
          ):( 
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
           {MovieFliter.map((movie) => (
             <Link
               key={movie.id}
               to={`/movie/${movie.id}`}
               className="transition transform hover:scale-105 hover:shadow-xl"
             >
               <Card name={movie.title} image={movie.image} />
             </Link>
           ))}
         </div>
            )}
      </div>
    </div>
  );
};

export default MovieList;
