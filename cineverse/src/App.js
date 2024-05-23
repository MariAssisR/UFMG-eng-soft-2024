import React from 'react';
import PopularMoviesPage from './components/homePage';
import MovieDetails from './components/movieDetails';

const App = () => {
  return (
    <div>
      <PopularMoviesPage/>
      <MovieDetails movieId={299536}/>
    </div>
  );
};

export default App;