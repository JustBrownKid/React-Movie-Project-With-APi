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
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-400"
          />
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
