import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../config/firebase';
import { 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    FacebookAuthProvider,
    createUserWithEmailAndPassword 
} from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user && Object.keys(user).length !== 0) {
                const { displayName, photoURL, uid, email } = user;

                if (!uid || !email) throw new Error('Missing data');

                setUser({
                    id: uid, email, name: displayName, photo: photoURL
                });
            }
        });
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_bd");

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) setUser(hasUser[0]);
        }
        setLoading(false);
    }, []);

    async function signUp(name, email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userInfo = userCredential.user;
            setUser({
                id: userInfo.uid,
                name: name,
                avatar: null
            });

            return userInfo;
        } catch (error) {
            throw new Error(error.code);
        }
    }

    async function signIn(email, password) {
        try {

            const result = await signInWithEmailAndPassword(auth, email, password);
            
            if (result.user) {
                const { displayName, photoURL, uid } = result.user;
    
                if (!displayName) {
                    throw new Error('Missing informations from the Google account');
                }
        
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                });

                return result.user
            
            }

        } catch (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                console.log('Account already exists with different credential');
                throw new Error('Account already exists with different credential');
            }
            throw new Error(error.code);
        }
    };

    async function signInWithGoogle() {
        try {

            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
        
            if (result.user) {
                const { displayName, photoURL, uid } = result.user;

                if (!displayName || !photoURL) {
                    throw new Error('Missing informations from the Google account');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                });

                return result.user;
            }
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/account-exists-with-different-credential') {
                console.log('Account already exists with different credential');
                throw new Error('Account already exists with different credential');
            }
        }
    }

    async function signInWithFacebook() {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const credential = FacebookAuthProvider.credentialFromResult(result);
            
            if (result.user) {
                const { displayName, photoURL, uid } = result.user;
                
                if (!displayName || !photoURL) {
                    throw new Error('Missing informations from the Google account');
                }
                
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                });
            }
        } catch (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                console.log('Account already exists with different credential');
                throw new Error('Account already exists with different credential');
            }
            throw new Error(error.code);
        }
    }

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, signed: !!user, profile, setProfile, signUp, signIn, signInWithGoogle, signInWithFacebook, signout }}>
            {children}
        </AuthContext.Provider>
    );
};
