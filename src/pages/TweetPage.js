import React,{useState,useEffect} from 'react'
import AddTweet from '../components/Tweets/AddTweet';
import Tweets from '../components/Tweets/Tweets';
import { db } from '../firebase'
import {addDoc,onSnapshot,collection} from "firebase/firestore"

function TweetPage()
{
    const [allTweets, setAllTweets] = useState([]);
    const tweetsCollectionRef = collection(db, "tweets") 
    
    
    useEffect(() =>
    {
        // const getAllTweets = async () =>
        // {
        //     const data = await getDocs(tweetsCollectionRef);
        //     console.log("data fetched from firebase");
        //     // console.log(data)
        //     setAllTweets(data.docs.map((doc) => ({
        //         ...doc.data(), id: doc.id
        //     })))
        // }
        // getAllTweets();
        
        
        // db.collection("tweets").onSnapshot( (snapshot) =>
        //     {
        //         setAllTweets(snapshot.docs.map(doc => ({
        //             id: doc.id,
        //             ...doc.data()
        //         })));
        // }, (err) =>
        // {
        //     console.log("error occured loading data from firebase");
        //     })
        // console.log("tweets loaded");

        
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
