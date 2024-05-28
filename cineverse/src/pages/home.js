import React from 'react';
import "../styles/home.css";
import Navbar from '../components/navBar';
import Footer from '../components/footer';
import Listing from '../components/listing';
import MainMovie from '../components/mainMovieDetails';

const HomePage = () => {
    return (
        <div className="homepage">
            <Navbar />
            <MainMovie />
            <Listing />
            <Footer />
        </div>
    );
};

export default HomePage;