import React, { useEffect, useState } from "react";
import "../styles/signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import axios from "../config/axios";

const SigninPage = () => {
    const { signIn, signInWithFacebook, signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user && user.length > 0) {
            navigate("/select-profile");
        }
    }, [user]);

    async function checkUser(id) {
        
        const response = await axios.get(`/users/${id}`);
        const userInfo = response.data;

        return userInfo
    }

    async function handleLogin(provider = null) {
        
        try {
            let res;
            if (provider === "google") {
                res = await signInWithGoogle();
            }

            else if (provider === "facebook") {
                res = await signInWithFacebook();
            }

            else {
                if (!email | !senha) {
                    setError("Fill in all the fields");
                    return;
                }
                res = await signIn(email, senha);

            }

            const userExists = await checkUser(res.uid);
            if (userExists.length === 0) {
                const request = await axios.post("/users/new", { 
                    uid: res.uid,
                    name: res.displayName
                });
            }
                        
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
                    type="email"
                    placeholder="Type your e-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError('')]}
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Type your password"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError('')]}
                    className="input"
                />
                {error && <p className="label-error">{error}</p>}
                <button onClick={() => handleLogin()} className="button">Sign In</button>
                <button onClick={() => handleLogin("google")} className="social-button google">Sign in with Google</button>
                <button onClick={() => handleLogin("facebook")} className="social-button facebook">Sign in with Facebook</button>
                <p className="label-signup">
                    Don't have an account?
                    <strong>
                        <Link to="/signup">&nbsp;Create Account</Link>
                    </strong>
                </p>
            </div>
        </div>
    );
};

export default SigninPage;