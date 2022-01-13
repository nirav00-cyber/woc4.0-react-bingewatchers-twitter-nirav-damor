import React,{useRef,useState} from 'react'

import './AddTweet.css'

import { useAuth } from '../../lib/AuthContext';

function AddTweet(props)
{
    const tweetRef = useRef();
    const [isAddingTweet, setIsAddingTweet] = useState(false);
    const { userInfo} = useAuth();
 

    const addTweetHandler = async(e) =>
    {
        e.preventDefault();
        
        const enteredTweet = tweetRef.current.value;
        const currentTime = new Date().toLocaleString();
        props.onAddTweet({ username:userInfo.username,tweet: enteredTweet,time:currentTime});
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
