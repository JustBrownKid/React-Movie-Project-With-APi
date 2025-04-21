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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-8 border-dashed border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.length === 0 ? (
          <div className="col-span-full text-center text-white">
            <p>No movies found.</p>
          </div>
        ) : (
          filteredMovies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <Card name={movie.title} image={movie.image} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
