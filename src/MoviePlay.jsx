import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

const MoviePlay = () => {
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
  return (
    <div className= " h-screen bg-gray-800">
    <div style={{ maxWidth: '900px', margin: 'auto', color: 'black' }}>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
        {/* Updated loader */}
        <div className="w-16 h-16 border-8 border-dashed border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      ) : movie ? (
        <>
          <h1 className='bg-green-600 mb-5 text-white p-5 font-bold'> ! Testing State မှာဖြစ်သောကြောင့် Movie data များသည် Dummy(fake data) များထည့်ထားပါသည်</h1> 
          <Plyr
            source={{
              type: 'video',
              title: movie.title,
              sources: [
                {
                  src: movie.watch,
                  type: 'video/mp4',
                  size: 720,
                },
              ],
              poster: movie.image,
            }}
            options={{
              controls: [
                'play-large', 'rewind', 'play', 'fast-forward',
                'progress', 'current-time', 'duration',
                'mute', 'volume', 'captions',
                'settings', 'fullscreen'
              ],
              ratio: '16:9',
              autoplay: false,
              seekTime: 10,
            }}
           
          />
        </>
      ) : (
        <p>Movie not found.</p>
      )}
    </div>
    </div>
  );
};

export default MoviePlay;
