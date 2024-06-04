import React, { useState } from "react";
import "../styles/signin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import axios from "../config/axios";

const CreateProfilePage = () => {
    const { profile, setProfile, user } = useAuth();

    const [name, setName] = useState("");
    const [kids, setKids] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleNewProfile() {
        
        try {

            if (!name) {
                setError("Fill in all the fields");
                return;
            }
            
            const res = await axios.post('/profiles/new', {
                uid: user.id,
                name: name,
                kids: kids,
                // profile: 
            });
                        
            navigate("/select-profile");
            
        } catch (e) {
            console.log(e.message);
            setError(e.message);
            return;    
        }
    };

    return (
        <div className="container">
            <div className="content">
                <h1 className="label">Cineverse</h1>
                <input
                    type="profile name"
                    placeholder="Type your name"
                    value={name}
                    onChange={(e) => [setName(e.target.value), setError('')]}
                    className="input"
                />
                <label>

                    <input
                        className="input"
                        type="checkbox"
                        placeholder="Type your password"
                        checked={kids}
                        onChange={(e) => [setKids(!kids), setError('')]}
                        />
                        <p className="label-signup">
                            Kids profile
                        </p>
                </label>
                {error && <p className="label-error">{error}</p>}
                <button onClick={() => handleNewProfile()} className="button">Create</button>
            </div>
        </div>
    );
};

export default CreateProfilePage;