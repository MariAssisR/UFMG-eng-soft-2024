import React, { useEffect, useState } from 'react';
import "../styles/listing.css";
import midia from '../services/midia';

const Listing = () => {
    const [movieCategories, setMovieCategories] = useState([]);

    useEffect(() => {
        const loadAll = async () => {
            try {
                const originals = await midia.getNetflixOriginals();
                const trending = await midia.getTrendingMovies();
                const topRated = await midia.getTopRatedMovies();
                const action = await midia.getMoviesByGenre(28);
                const comedy = await midia.getMoviesByGenre(35);
                const horror = await midia.getMoviesByGenre(27);
                const romance = await midia.getMoviesByGenre(10749);
                const scify = await midia.getMoviesByGenre(878);

                setMovieCategories([
                    { slug: 'originals', title: 'Cineverse Originals', items: originals },
                    { slug: 'trending', title: 'Trending', items: trending },
                    { slug: 'toprated', title: 'Top Rated', items: topRated },
                    { slug: 'action', title: 'Action', items: action },
                    { slug: 'comedy', title: 'Comedy', items: comedy },
                    { slug: 'horror', title: 'Horror', items: horror },
                    { slug: 'romance', title: 'Romance', items: romance },
                    { slug: 'scify', title: 'Science Fiction', items: scify },
                ]);
            } catch (error) {
                console.error('Error loading movie lists:', error);
            }
        };

        loadAll();
    }, []);

    return (
        <div className="listing">
            {movieCategories.map((category) => (
                <div key={category.slug} className="movie-row">
                    <h2 className="movie-row__title">{category.title}</h2>
                    <div className="movie-row__posters">
                        {category.items.map((item) => (
                            <img 
                                key={item.id} 
                                className="movie-row__poster" 
                                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} 
                                alt={item.name || item.title} 
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Listing;