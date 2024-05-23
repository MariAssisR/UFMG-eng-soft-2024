import React, { useEffect, useState } from 'react';
import midia from '../services/midia';

const MovieDetails = ({ movieId }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieData = await midia.getMovieDetails(movieId);
                setMovie(movieData);
            } catch (error) {
                console.error('Error loading movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
            <ul>
                <li>Release Date: {movie.release_date}</li>
                <li>Rating: {movie.vote_average}</li>
                <li>Genres: {movie.genres.map((genre) => genre.name).join(', ')}</li>
            </ul>
        </div>
    );
};

export default MovieDetails;
