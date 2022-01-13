import React,{useState,useContext,useEffect} from 'react'
import  {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth()
{
    return useContext(AuthContext)
}
export function AuthProvider(props)
{   
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true);
    
    function signup(email, password)
    {
        return createUserWithEmailAndPassword(auth,email, password);
    }
    function login(email, password)
    {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout()
    {
        return signOut(auth);
    }
    useEffect(() =>
    {
        const unsubscribe = onAuthStateChanged(auth, (user) =>
        {
            setCurrentUser(user)
            setLoading(false)
            // console.log(user.uid)
        })
        return unsubscribe;

        
    
    }, [])
    
    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}
