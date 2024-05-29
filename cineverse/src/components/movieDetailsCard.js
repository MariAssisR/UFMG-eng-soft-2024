import React from 'react';
import "../styles/movieDetailsCard.css";

const MovieDetailsCard = ({ movie, onClose }) => {
    return (
        <div className="movie-details-card__overlay">
            <div className="movie-details-card">
                <button className="close-button" onClick={onClose}> x </button>
                <div className="movie-details-card__content">
                    <img
                        className="movie-details-card__poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                    />
                    <div className="movie-details-card__info">
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                        <p>Rating: {movie.vote_average}</p>
                        <p>Genres: {movie.genres.map((genre) => genre.name).join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieDetailsCard;
