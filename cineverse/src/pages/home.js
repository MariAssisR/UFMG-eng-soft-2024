import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import Listing from '../components/listing';
import MovieDetails from '../components/movieDetails';

const HomePage = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <h1>Home</h1>
                <button onClick={() => [signout(), navigate("/")]}>Logout</button>
            </div>
            <div>
                <Listing />
                <MovieDetails movieId={299536} />
            </div>
        </div>
    );
};

export default HomePage;