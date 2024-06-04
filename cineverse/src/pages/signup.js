import React, { useEffect, useState } from "react";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import axios from "../config/axios"

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { signUp, signInWithFacebook, signInWithGoogle, user } = useAuth();

    useEffect(() => {
        if (user && user.length > 0) {
            navigate("/select-profile");
        }
    }, [user]);

    async function handleSignup(provider = null) {     
        try {
            let res;
            
            if (provider === "google") {
                res = await signInWithGoogle();
            }

            else if (provider === "facebook") {
                res = await signInWithFacebook();
            }

            else {
                if (!name || !email | !emailConf | !senha) {
                    setError("Fill in all the fields");
                    return;
                } 
                
                if (email !== emailConf) {
                    setError("Emails do not match");
                    return;
                }

                res = await signUp(name, email, senha);

            }

            const request = await axios.post("/users/new", { 
                uid: res.uid,
                name: res.displayName
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
                <h1 className="label">SIGN UP</h1>
                <input
                    type="name"
                    placeholder="Type your name"
                    value={name}
                    onChange={(e) => [setName(e.target.value), setError('')]}
                    className="input"
                />
                <input
                    type="email"
                    placeholder="Type your e-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError('')]}
                    className="input"
                />
                <input
                    type="email"
                    placeholder="Confirm your e-mail"
                    value={emailConf}
                    onChange={(e) => [setEmailConf(e.target.value), setError('')]}
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
                <button onClick={handleSignup} className="button">Sign Up</button>
                <button onClick={() => handleSignup("google")} className="social-button google">Sign up with Google</button>
                <button onClick={() => handleSignup("facebook")} className="social-button facebook">Sign up with Facebook</button>
                <p className="label-signup">
                    Already have an account?
                    <strong>
                        <Link to="/">&nbsp;Login</Link>
                    </strong>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;