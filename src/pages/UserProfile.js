import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import avatar from '../avatars/avatar.jpg';
// import './Profile.css';
import { db } from '../firebase'
import {doc,getDoc,collection,where,query,onSnapshot} from "firebase/firestore"
import Tweets from '../components/Tweets/Tweets';

function UserProfile(props)
{
  
    const params = useParams();
    const { profileId } = params;
    console.log(profileId);
    const [userProfileData, setUserProfileData] = useState({});
    const [userTweets, setUserTweets] = useState([]);

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
    
    return (
        <div className='userprofile-container'>
        <div className='profile-container'>
            <div className='avatar-container'>
                <img src={avatar} alt=""></img>
                <h3>{userProfileData.username}</h3>
            </div>
            <div className='details-part1'>
                <div className='tweets'>
                   Tweets
                        <p>{userProfileData.tweetCount}</p>
                </div>
                <div className='following'>
                        Following<p>{userProfileData.following}</p>
                </div>
                <div className='followers'>
                        Followers<p>{userProfileData.followers}</p>
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
