import React, { useEffect, useState } from 'react';
import { useParams ,Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://raw.githubusercontent.com/JustBrownKid/data/refs/heads/main/test.json`)
      .then((response) => {
        const movieData = response.data.data.find((movie) => movie.id === parseInt(id));
        if (movieData) {
          setMovie(movieData);
        } else {
          console.error('Movie not found');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center  h-screen">
        {/* Updated loader */}
        <div className="w-16 h-16 border-8 border-dashed border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center text-red-600 mt-10">Movie not found</div>;
  }

  return (
    <div className="p-6 bg-gray-800 text-white">
      {/* Movie Info */}
      <div className="lg:flex lg:items-center lg:space-x-12">
        {/* Poster */}
        <div className="flex-shrink-0 mb-8 lg:mb-0 flex justify-center">
          <img
            className="w-64 h-96 object-cover rounded-lg shadow-lg border border-gray-700"
            src={movie.image}
            alt={movie.title}
          />
        </div>

        {/* Details */}
        <div className="lg:flex-1">
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>

          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-yellow-300 text-gray-800">
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-1.5"></span> {movie.release_year}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-yellow-300 text-gray-800">
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-1.5"></span> {movie.runtime}
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.categories?.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-red-400 text-zinc-900"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className=" mb-6 leading-relaxed">
            <span className="font-semibold">Synopsis:</span> {movie.description}
          </p>

          {/* Buttons */}
          <div className="space-x-4">
           
<Link
  to={`/movie/play/${movie.id}`}
  className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out"
>
  Watch Now
</Link>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-white m-4">Cast Members</h2>
        <div className="m-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {movie.actors?.map((cast) => (
              <div
                key={cast.id}
                className="relative group min-w-[140px] bg-gray-800 rounded-xl overflow-hidden shadow-md flex-shrink-0 border border-gray-700 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                <img
                  src={cast.image}
                  alt={cast.name}
                  className="w-full h-40 object-cover group-hover:scale-105 group-hover:brightness-75 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-sm m-2 mb-3 text-white font-semibold truncate">{cast.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
