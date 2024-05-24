import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from "./auth/auth";
import HomePage from "./pages/home";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";

const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed > 0 ? <Item /> : <Navigate to="/" />
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SigninPage />} />
                <Route path='*' element={<Navigate to="/" />} />
                <Route exact path='/home' element={<Private Item={HomePage} />} />
                <Route exact path='/signup' element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp