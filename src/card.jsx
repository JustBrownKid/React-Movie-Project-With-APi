import React from 'react'

const Card = (props) => { 
  return (
     <div className="relative max-w-xs h-full rounded-2xl overflow-hidden shadow-md bg-white group">
  <img
    src={props.image}
    id={props.key}
    alt="Movie Poster"
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
  />
  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-500">
    <h2 className="text-xl font-semibold text-white text-center px-2">{props.name}</h2>
  </div>
</div>

   
  )
}

export default Card