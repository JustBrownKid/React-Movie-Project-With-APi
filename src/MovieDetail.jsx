import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="w-16 h-16 border-8 border-dashed border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center text-red-600 mt-10">Movie not found</div>;
  }

  return (
  <div className="relative min-h-screen bg-black text-white overflow-hidden">
    {/* Background Poster */}
    <div
      className="absolute inset-0 bg-cover bg-center blur-sm brightness-50"
      style={{ backgroundImage: `url(${movie.image})` }}
    ></div>

    {/* Overlay Content */}
    <div className="relative z-10 px-4 sm:px-6 pt-16 pb-32 max-w-6xl mx-auto">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center lg:flex-row lg:items-start lg:space-x-12">
        {/* Poster */}
        <div className="mb-6 lg:mb-0">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-60 h-96 object-cover rounded-xl shadow-lg border border-white/10"
          />
        </div>

        {/* Details */}
        <div className="flex-1 w-full space-y-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-amber-400">{movie.title}</h1>

          <div className="space-y-2 text-sm text-gray-300">
  {/* Release Year & Runtime */}
  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
    <span className="bg-gray-800 px-3 py-1 rounded">{movie.release_year}</span>
    <span className="bg-gray-800 px-3 py-1 rounded">{movie.runtime}</span>
  </div>

  {/* Categories */}
  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
    {movie.categories?.map((cat, i) => (
      <span key={i} className="bg-red-600 px-3 py-1 rounded">
        {cat.name}
      </span>
    ))}
  </div>
</div>


          <p className="text-gray-200 leading-relaxed">
            <span className="font-semibold text-white">Synopsis:</span> {movie.description}
          </p>

          {/* Watch Now Button */}
          <div className="pt-4">
            <Link
              to={`/movie/play/${movie.id}`}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded shadow-lg transition-all duration-200"
            >
              Watch Now
            </Link>
          </div>
        </div>
      </div>

      {/* Cast */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {movie.actors?.map((actor) => (
            <div
              key={actor.id}
              className="min-w-[130px] rounded-xl bg-white/10 border border-white/10 shadow-md overflow-hidden hover:scale-105 transition duration-300"
            >
              <img src={actor.image} alt={actor.name} className="h-40 w-full object-cover" />
              <div className="p-2 text-center text-sm font-medium text-white">{actor.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default MovieDetail;
