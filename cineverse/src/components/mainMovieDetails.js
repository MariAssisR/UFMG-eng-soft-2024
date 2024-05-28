import React from 'react';
import "../styles/mainMovie.css";

const MainMovie = () => {
    // Esta função retornará o filme principal
    const mainMovie = {
        title: "Main Movie Title",
        overview: "This is the overview of the main movie. It gives a brief description of the movie plot.",
        backdropPath: "path_to_image.jpg" // Substitua pelo caminho da imagem do filme principal
    };

    return (
        <div className="main-movie" style={{ backgroundImage: `url(${mainMovie.backdropPath})` }}>
            <div className="main-movie__content">
                <h1 className="main-movie__title">{mainMovie.title}</h1>
                <p className="main-movie__overview">{mainMovie.overview}</p>
            </div>
        </div>
    );
};

export default MainMovie;
