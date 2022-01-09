import React,{useState,useContext,useEffect} from 'react'
import  { createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"
import {auth} from "../firebase"
const AuthContext = React.createContext()

export function useAuth()
{
    return useContext(AuthContext)
}
export function AuthProvider(props)
{   
    const [currentUser, setCurrentUser] = useState()
    
    function signup(email, password)
    {
        createUserWithEmailAndPassword(auth,email, password);
    }
    useEffect(() =>
    {
        const unsubscribe = onAuthStateChanged(auth, (user) =>
        {
            setCurrentUser(user)
        })
        return unsubscribe;
    },[])
    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
