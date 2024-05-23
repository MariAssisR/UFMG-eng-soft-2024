import React, { useEffect, useState } from 'react';
import midia from '../services/midia';

const Home = () => {
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
        <div>
            {movieCategories.map((category) => (
                <div key={category.slug}>
                    <h2>{category.title}</h2>
                    <ul>
                        {category.items.map((item) => (
                            <li key={item.id}>{item.name || item.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Home;