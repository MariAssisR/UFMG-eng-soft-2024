import React from 'react';
import "../styles/navbar.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const Navbar = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signout();
        navigate('/');
    };

    return (
        <div className="navbar">
            <div className="navbar__logo">Cineverse</div>
            <button className="navbar__logout" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Navbar;
