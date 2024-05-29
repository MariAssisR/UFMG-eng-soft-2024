import React, { useState, useRef, useEffect } from 'react';
import "../styles/navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import profilePic from '../assets/profile-pic.jpg'; // default profile pic
import midia from '../services/midia'; // function to search
import MovieDetailsCard from './movieDetailsCard';

const Navbar = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const searchRef = useRef(null);

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.length > 1) {
            const results = await midia.searchMoviesByName(e.target.value);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMovieClick = async (movieId) => {
        const movieDetails = await midia.getMovieDetails(movieId);
        setSelectedMovie(movieDetails);
        setSearchResults([]);
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
    };

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <Link to="/home" className="navbar__logo">Cineverse</Link>
                <Link to="/home" className="navbar__link">Home</Link>
                <Link to="/movies" className="navbar__link">Movies</Link>
                <Link to="/series" className="navbar__link">Series</Link>
            </div>
            <div className="navbar__right">
                <div className="navbar__search" ref={searchRef}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map(result => (
                                <div key={result.id} className="search-result-item" onClick={() => handleMovieClick(result.id)}>
                                    {result.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <img
                    src={profilePic}
                    alt="Profile"
                    className="navbar__profile-pic"
                    onClick={() => navigate('/profile')}
                />
                <button className="navbar__logout" onClick={() => [signout(), navigate("/")]}>Logout</button>
            </div>
            {selectedMovie && (
                <div className="movie-details-card__overlay">
                    <MovieDetailsCard movie={selectedMovie} onClose={handleCloseDetails} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
