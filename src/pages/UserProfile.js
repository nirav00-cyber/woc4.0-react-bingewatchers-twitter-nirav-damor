import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import avatar from '../avatars/avatar.jpg';
// import './Profile.css';
import { db } from '../firebase'
import {doc,getDoc,collection,where,query,onSnapshot, deleteDoc, setDoc} from "firebase/firestore"
import Tweets from '../components/Tweets/Tweets';
import './Profile.css';
import { useAuth } from '../lib/AuthContext';
function UserProfile(props)
{
  
    const params = useParams();
    const { profileId } = params;
    // console.log(profileId);
    const [userProfileData, setUserProfileData] = useState({});
    const [userTweets, setUserTweets] = useState([]);
    const { currentUser } = useAuth();
    const [isFollowing, setIsFollowing] = useState(true);
    const [countFollowing, setCountFollowing] = useState(0);
    const [countFollowers, setCountFollowers] = useState(0);
    // const currentFollowingRef = useRef('0');
    // const currentFollowersRef = useRef('0');
    useEffect(() =>
    {
        const getProfileData = async () =>
        { 
            try
            {
                const profileRef = doc(db, "profile", profileId);
                const profileData = await getDoc(profileRef);
                setUserProfileData(profileData.data());
          
            }
            catch(err) {
                console.log('errror occured while fetching userDAta', err);
            }
        }
        const getUsersTweets = async () =>
        {
            try
            {
                const usersTweetRef = collection(db, "tweets");
                const usersTweetQuery = query(usersTweetRef, where("userid", "==", profileId));
                // const usersTweets = await getDocs(usersTweetQuery);
                // setUserTweets(usersTweets.docs.map(doc => ({
                //     id: doc.id,
                //     ...doc.data()
                // })))
                
           
             onSnapshot(usersTweetQuery, (snapshot) =>
             {
                 setUserTweets(snapshot.docs.map(doc => ({
                     id: doc.id,
                     ...doc.data()
               })))
           })
        
            
            } catch (err)
            {
                console.log("error occured while fetching users tweet", err);
            }
        }

        getProfileData();
        getUsersTweets();
        
        return () =>
        {
            setUserProfileData({});
            setUserTweets([]);
        }
    }, [profileId])
    useEffect(() =>
    {
        const getIsFollowing = async () =>
        {
        const getFollowingRef = doc(db, "profile", currentUser.uid, "Following", profileId);
        const docSnap = await getDoc(getFollowingRef);

        if (docSnap.exists())
        {
            setIsFollowing(true);
        }
        else
        {
            setIsFollowing(false);
        }
        }
        const followingCollectionRef = collection(db, "profile", profileId, "Following");
        const followersCollectionRef = collection(db, "profile", profileId, "Followers");

        onSnapshot(followingCollectionRef, (snapshot) =>
        { 
            
               setCountFollowing(snapshot.size);
            
        })
        onSnapshot(followersCollectionRef, (snapshot) =>
        { 
            setCountFollowers(snapshot.size);
        })
        getIsFollowing();
    },[profileId,currentUser])
    const followHandler = async() =>
    {
        if (isFollowing)
        {
            const deleteFollowingRef = doc(db, "profile", currentUser.uid, "Following", profileId);
            const deleteFollowersRef = doc(db, "profile", profileId, "Followers", currentUser.uid);
            // const updateFollowingRef = doc(db, "profile", currentUser.uid);
            // const updateFollowersRef = doc(db, "profile", profileId);
            try
            {
                await deleteDoc(deleteFollowingRef);
                await deleteDoc(deleteFollowersRef);
                
                // await updateDoc(updateFollowingRef, { following: userInfo.following - 1 });
                // await updateDoc(updateFollowersRef, { followers: userProfileData.followers - 1});
                setIsFollowing(false);
            } catch (err)
            {
                console.log("errror occured while unfollowing",err);
            }
        }
        else
        {
            const addFollowingCollectionRef = collection(db, "profile", currentUser.uid, "Following");
            const addFollowerCollectionRef = collection(db, "profile", profileId, "Followers");
            // const updateFollowingRef = doc(db, "profile", currentUser.uid);
            // const updateFollowersRef = doc(db, "profile", profileId); 
            try
            {
                await setDoc(doc(addFollowingCollectionRef, profileId), { userid: profileId });
                await setDoc(doc(addFollowerCollectionRef, currentUser.uid), { userid: currentUser.uid });
                // await updateDoc(updateFollowingRef, { following: userInfo.following + 1 });
                // await updateDoc(updateFollowersRef, { followers: userProfileData.followers + 1 });
       
                setIsFollowing(true);
            } catch (err)
            {
                console.log("error occured while following user",err);
            }
        }
    }
    const followBtnClasses = isFollowing ?'follow-btn unfollow' :'follow-btn';

    return (
        <div className='userprofile-container'>
        <div className='profile-container'>
            <div className='avatar-container'>
                <img src={avatar} alt=""></img>
                <h3>{userProfileData.username}</h3>
                    { !(currentUser.uid===profileId) && <button className={followBtnClasses} onClick={followHandler}>
                    {isFollowing ? 'unfollow' : 'Follow'}
                    </button>    }
            </div>
            <div className='details-part1'>
                <div className='tweets'>
                   Tweets
                        <p>{userProfileData.tweetCount}</p>
                </div>
                <div className='following'>
                        Following<p>{countFollowing}</p>
                </div>
                <div className='followers'>
                        Followers<p>{countFollowers}</p>
                </div>
            </div>
                <div className='details-part2'>
                    Description<p>other User profileData
                    </p>
                </div>
        </div>
        <Tweets displaydummyTweets={userTweets} ></Tweets>
        </div>
    )
}

export default UserProfile;
