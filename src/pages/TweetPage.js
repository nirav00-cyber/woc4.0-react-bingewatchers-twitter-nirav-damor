import React,{useState,useEffect} from 'react'
import AddTweet from '../components/Tweets/AddTweet';
import Tweets from '../components/Tweets/Tweets';
import { db } from '../firebase'
import {addDoc,onSnapshot,collection} from "firebase/firestore"

function TweetPage()
{
    const [allTweets, setAllTweets] = useState([]);
    
    
    
    useEffect(() =>
    {
        const tweetsCollectionRef = collection(db, "tweets");

         onSnapshot(tweetsCollectionRef, (snapshot) =>
         {

             
                setAllTweets(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })));
                
         })
        
        return () =>
        {
            setAllTweets([]);
        }
        // clean up function 
    },[]);

    const addTweet = async (newTweet) =>
    {
        try
        {
            const tweetsCollectionRef = collection(db, "tweets") 
            await addDoc(tweetsCollectionRef, { userid: newTweet.userid, name: newTweet.username, text: newTweet.tweet, time: newTweet.time,likeCount:0 })
       

        }
        catch(err) {
            console.log(err)
            alert('failed to add tweet');
        }
  

        // setAllTweets((prevState) =>
        // {
        //     return [{ id:Math.floor(Math.random()*100000),name: 'nirav2', text: newTweet.tweet, time: newTweet.time,avatar:'dw' }, ...prevState];
        // })
   }

    return (
        <>
        <AddTweet onAddTweet={addTweet}></AddTweet>
        <Tweets displaydummyTweets={allTweets} ></Tweets>
        </>
    );
}

export default TweetPage
