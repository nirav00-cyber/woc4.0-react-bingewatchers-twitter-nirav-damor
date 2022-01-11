import React,{useState,useEffect} from 'react'
import AddTweet from '../components/Tweets/AddTweet';
import Tweets from '../components/Tweets/Tweets';
import {db} from '../firebase'
import {collection,getDocs,addDoc} from "firebase/firestore"
function TweetPage()
{
    const [allTweets, setAllTweets] = useState([]);
    const tweetsCollectionRef = collection(db, "tweets") 
    const [renderFirebase, setRenderFirebase] = useState(false);

    useEffect(() =>
    {
        const getAllTweets = async () =>
        {
            const data = await getDocs(tweetsCollectionRef);
            console.log("data fetched from firebase");
            // console.log(data)
            setAllTweets(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        }
        getAllTweets();
    }, [renderFirebase]);

    const addTweet = async (newTweet) =>
    {
        await addDoc(tweetsCollectionRef,{name:'nirav2',text:newTweet.tweet,time:newTweet.time})
        
        console.log('Tweet added');
        setRenderFirebase((prevState) => !prevState);
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
