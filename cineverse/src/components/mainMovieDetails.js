import React, { useEffect, useState } from 'react';
import "../styles/mainMovie.css";
import midia from '../services/midia';

const MainMovie = () => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const results = await midia.searchMoviesByName('Vingadores');
                if (results && results.length > 0) {
                    setMovie(results[0]);
                }
            } catch (error) {
                console.error('Error fetching the movie:', error);
            }
        };

        fetchMovie();
    }, []);

    if (!movie) return null;

    return (
        <header className="banner">
            <img
                key={movie.id} 
                className="banner__background"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.name || movie.title}
            />
            <div className="banner__content">
                <h1 className="banner__title">{movie.title}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <p className="banner__description">{movie.overview}</p>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    );
};

export default MainMovie;
