import React from 'react';
import "../styles/profile.css";
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/profile-pic.jpg';

const ProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div className="profile-page">
            <div className="profile-header">
                <button className="back-button" onClick={() => navigate("/home")}>←</button>
                <h1 className="profile-title">My Profiles</h1>
            </div>
            <div className="profile-content">
                <h2 className="profile-username">User Name</h2>
                <p className="profile-email">user@example.com</p>
                <p className="profile-message">Welcome back! Here's something interesting for you...</p>
                <div className="profile-buttons">
                    <button className="profile-button" onClick={() => navigate('/select-profile')}>Select Profile</button>
                    <button className="profile-button" onClick={() => navigate('/pay')}>Payment History</button>
                </div>
            </div>
        </div>
    );
};

const SelectProfilePage = () => {
    const navigate = useNavigate();

    const profiles = [
        { id: 1, name: 'User 1', pic: profilePic },
        { id: 2, name: 'User 2', pic: profilePic },
        { id: 3, name: 'User 3', pic: profilePic },
        { id: 'new', name: 'Create Profile', pic: profilePic }
    ];

    return (
        <div className="select-profile-page">
            <button className="select-profile-back-button" onClick={() => navigate("/profile")}>←</button>
            <h1 className="select-profile-title">Select Profile</h1>
            <div className="select-profile-list">
                {profiles.map(profile => (
                    <div key={profile.id} className="select-profile-item" onClick={() => navigate(profile.id === 'new' ? '/create-profile' : `/profile/${profile.id}`)}>
                        <img src={profile.pic} alt={profile.name} className="select-profile-pic" />
                        <p className="select-profile-name">{profile.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PayPage = () => {
    const navigate = useNavigate();

    const paymentHistory = [
        { date: '2024-04-01', method: 'Credit Card', amount: '$10.99' },
        { date: '2024-03-01', method: 'Credit Card', amount: '$10.99' },
        { date: '2024-02-01', method: 'Credit Card', amount: '$10.99' }
    ];

    const accountType = 'Paid'; // or 'Trial'
    const paymentMethod = 'Credit Card'; // or 'Boleto', 'Pix'

    return (
        <div className="payment-history-page">
            <button className="payment-back-button" onClick={() => navigate("/profile")}>←</button>
            <h1 className="payment-history-title">Payment History</h1>
            <div className="payment-account-info">
                <p>Account Type: {accountType}</p>
                {accountType === 'Paid' && <p>Payment Method: {paymentMethod}</p>}
            </div>
            <div className="payment-list">
                {paymentHistory.map((payment, index) => (
                    <div key={index} className="payment-item">
                        <p>{payment.date}</p>
                        <p>{payment.method}</p>
                        <p>{payment.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Profile =  {
	ProfilePage,
    SelectProfilePage,
	PayPage
};

export default Profile;