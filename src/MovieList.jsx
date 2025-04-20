import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link
import Card from './card';  // Assuming Card component exists

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/JustBrownKid/data/refs/heads/main/test.json')
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.data)) {
          setMovies(response.data.data);  // Correcting access to movie data
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
      <div className="flex justify-center items-center h-screen">
        {/* Updated loader */}
        <div className="w-16 h-16 border-8 border-dashed border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8">
      {movies.length === 0 ? (
        <div className="col-span-full text-center text-white">
          <p>No movies found.</p>
        </div>
      ) : (
        movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>  {/* Use Link to wrap the Card */}
            <Card name={movie.title} image={movie.image} />
          </Link>
        ))
      )}
    </div>
  );
};

export default MovieList;
