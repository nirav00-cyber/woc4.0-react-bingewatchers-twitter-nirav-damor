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
const TMDB_API = 'https://api.themoviedb.org/3/trending/all/day?api_key=417ae7fd956736f41db826d383085158';

export function useAuth()
{
    return useContext(AuthContext)
}
export function AuthProvider(props)
{   
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
    const [trendingShows, setTrendingShows] = useState([]);
  
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
            async function fetchTrending()
            {
            let dummyShows = [];
            const response = await fetch(TMDB_API);
            const data = await response.json();
            if (!response.ok)
            {
                alert('Error Occurred while fetching Data');
                return;
            }
            // console.log(data);
            const shows = data.results;
            for(let show in shows)
            {
                const showObj = {
                    id: shows[show].id,
                    title: shows[show].title,
                    releaseDate: shows[show].release_date,
                    description:shows[show].overview,
                    rating: shows[show].vote_average,   
                    poster:shows[show].backdrop_path
                }    
                dummyShows.push(showObj);
                }
                setTrendingShows(dummyShows);
            // console.log(dummyShows);    
            }
   
        fetchTrending();        
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
        userInfo,
        trendingShows
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}
