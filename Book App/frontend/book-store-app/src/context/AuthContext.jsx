import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config"
import { createContext, useState, useContext, useEffect } from "react";


// create context which hold the state and function related to authentication
// shared throughout the app
const AuthContext = createContext();

// custom hook to easily access AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider(); // used for sign-in with google

// authProvider
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // sign-up with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }

    // logout user
    const logoutUser = () => {
        return signOut(auth);
    }

    // manage user
    useEffect(() => { // used to run side-effects in components in react
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // this triggers whenever authentication state changes (login/logout)
            setCurrentUser(user);
            setLoading(false);

            if (user) { // if user is logged in -> set user data
                const { email, displayName, photoUrl } = user;
                const userData = {
                    email, username: displayName, photo: photoUrl
                }
            }
        })
        return () => unsubscribe();
    }, []);

    // hold context values
    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logoutUser
    }
    // passes value to AuthContext.Provider so any child components can access it
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}