import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // use Routes instead of Switch
import MovieList from './MovieList';
import MovieDetail from './MovieDetail'; // Make sure this component exists
import MoviePlay from './MoviePlay'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/play/:id" element={<MoviePlay />} />
      </Routes>
    </Router>
  );
};

export default App;
