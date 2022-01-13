import React,{useState,useContext,useEffect} from 'react'
import  {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { auth } from "../firebase"
import { db } from '../firebase';
import { doc, getDoc} from "firebase/firestore"

const AuthContext = React.createContext()

export function useAuth()
{
    return useContext(AuthContext)
}
export function AuthProvider(props)
{   
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
    
    // console.log(currentUser.uid)
    // const userProfileRef = doc(db, "profile", currentUser.uid)

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
            if (user)
            {
                
            const userProfileRef = doc(db, "profile", user.uid)
            const getUserProfileData = async () =>
            {
            try
            {
                const profileDataSnap = await getDoc(userProfileRef);
                // console.log(profileDataSnap.data());
                setUserInfo({
                    username: profileDataSnap.data().username,
                    following: profileDataSnap.data().following,
                    followers: profileDataSnap.data().followers,
                    tweetCount:profileDataSnap.data().tweetCount
                })
            } catch (err)
            {
                console.log('profiledata fetching failed',err)
            }
            
        }
        getUserProfileData();
                
            }
        })
        return unsubscribe;

        
    
    }, [])
    
//    useEffect(() =>
//     {
//         const getUserProfileData = async () =>
//         {
//             try
//             {
//                 const profileDataSnap = await getDoc(userProfileRef);
//                 // console.log(profileDataSnap.data());
//                 setUserInfo({
//                     username: profileDataSnap.data().username,
//                     following: profileDataSnap.data().following,
//                     followers: profileDataSnap.data().followers,
//                     tweetCount:profileDataSnap.data().tweetCount
//                 })
//             } catch (err)
//             {
//                 console.log('profiledata fetching failed',err)
//             }
            
//         }
//         getUserProfileData();
//         return () => setUserInfo({});
//     },[])
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        userInfo
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}
