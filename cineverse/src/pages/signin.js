import React, { useState } from "react";
import "../styles/signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

const SigninPage = () => {
    const { signin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email | !senha) {
            setError("Fill in all the fields");
            return;
        }

        const res = signin(email, senha);

        if (res) {
            setError(res);
            return;
        }

        navigate("/home");
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
                <button onClick={handleLogin} className="button">Sign In</button>
                <button className="social-button google">Sign in with Google</button>
                <button className="social-button facebook">Sign in with Facebook</button>
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