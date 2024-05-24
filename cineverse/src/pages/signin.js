import React, { useState } from "react";
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
        <div>
            <h1>LOGIN</h1>
            <div>
                <input type="email" placeholder="Type your e-mail" value={email} onChange={(e) => [setEmail(e.target.value), setError('')]} />
                <input type="password" placeholder="Type your password" value={senha} onChange={(e) => [setSenha(e.target.value), setError('')]} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handleLogin}>Sign In</button>
                <p>
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