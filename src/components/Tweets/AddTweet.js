import React,{useRef,useState} from 'react'

import './AddTweet.css'

import { useAuth } from '../../lib/AuthContext';
import { db } from '../../firebase';
import { doc, updateDoc } from "firebase/firestore";

function AddTweet(props)
{
    const tweetRef = useRef();
    const [isAddingTweet, setIsAddingTweet] = useState(false);
    const { userInfo,currentUser} = useAuth();
    const updateprofileRef = doc(db,"profile",currentUser.uid)

    const addTweetHandler = async(e) =>
    {
        e.preventDefault();
        
        const enteredTweet = tweetRef.current.value;
        const currentTime = new Date().toLocaleString();
        
        try
        {
            const updatedDoc = {tweetCount:userInfo.tweetCount + 1}
            await updateDoc(updateprofileRef, updatedDoc)
            userInfo.tweetCount = userInfo.tweetCount + 1;
         } catch (err)
        {
            console.log("profile update failed")
        }
        // console.log(currentUser.uid,typeof currentUser.uid)
        props.onAddTweet({userid:currentUser.uid,username:userInfo.username,tweet: enteredTweet,time:currentTime});
        setIsAddingTweet(false);
        
    }
    const addStateChangeHandler = () =>
    {
        setIsAddingTweet(true);
    }
    const cancelTweetHandler = () =>
    {
        setIsAddingTweet(false);
    }
    
    return (

        <div className='add-tweet'>
            {!isAddingTweet &&
                <button className='tweet-toggle-button' onClick={addStateChangeHandler}>Add Tweet</button>}
            {isAddingTweet && 
                    
        <div className='add-tweet-container'>
            <form className='add-tweet-form'
                        onSubmit={addTweetHandler}
                        autoFocus
                    >
                <div className='input-tweet'>
                    <label htmlFor='tweet'>Your Tweet</label>
                    <textarea id='tweet' rows='5' ref={tweetRef} placeholder='Enter Your Tweet Here'></textarea>
                            <div className='tweet-buttons'>
                                <button type='submit'>Tweet</button>
                            <button type='cancel' onClick={cancelTweetHandler}>Cancel</button>
                    </div>
                </div>
               
            </form>
        </div>}
        </div>
    )
}

export default AddTweet
