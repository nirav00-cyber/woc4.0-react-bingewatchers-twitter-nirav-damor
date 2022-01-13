import React,{useState,useEffect} from 'react'
import Profile from '../components/Profile/Profile'
import { db } from '../firebase';
import { doc, getDoc} from "firebase/firestore"
import { useAuth } from '../lib/AuthContext';

function ProfilePage()
{
    const [userInfo, setUserInfo] = useState({});
    
    const { currentUser } = useAuth();
    // console.log(currentUser.uid)
    const userProfileRef = doc(db, "profile", currentUser.uid)

    useEffect(() =>
    {
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
        return () => setUserInfo({});
    },[])

    return (
        <div>
     
            <Profile userProfile={userInfo}/>
        </div>
    )
}

export default ProfilePage
