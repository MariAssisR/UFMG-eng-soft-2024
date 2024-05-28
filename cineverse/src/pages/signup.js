import React, { useState } from "react";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { signup } = useAuth();

    const handleSignup = () => {
        if (!email | !emailConf | !senha) {
            setError("Fill in all the fields");
            return;
        } else if (email !== emailConf) {
            setError("Emails do not match");
            return;
        }

        const res = signup(email, senha);

        if (res) {
            setError(res);
            return;
        }

        alert("User registered successfully!");
        navigate("/");
    };

    return (
        <div className="container">
            <div className="content">
                <h1 className="label">SIGN UP</h1>
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