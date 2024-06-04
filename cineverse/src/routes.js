import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from "./auth/auth";
import HomePage from "./pages/home";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import Midia from "./pages/midias";
import Profile from "./pages/profile";
import CreateProfilePage from "./pages/createprofile";

const Private = ({ Item }) => {
    const { user, signed } = useAuth();
    if (user) console.log(Object.keys(user).length)
    return (user && Object.keys(user).length > 0) ? <Item /> : <Navigate to="/" />
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SigninPage />} />
                <Route path='*' element={<Navigate to="/" />} />
                <Route exact path='/home' element={<Private Item={HomePage} />} />
                <Route exact path='/movies' element={<Private Item={Midia.MoviePage} />} />
                <Route exact path='/series' element={<Private Item={Midia.SeriePage} />} />
                <Route exact path='/profile' element={<Private Item={Profile.ProfilePage} />} />
                <Route exact path='/create-profile' element={<Private Item={CreateProfilePage} />} />
                <Route exact path='/select-profile' element={<Private Item={Profile.SelectProfilePage} />} />
                <Route exact path='/pay' element={<Private Item={Profile.PayPage} />} />
                <Route exact path='/signup' element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp