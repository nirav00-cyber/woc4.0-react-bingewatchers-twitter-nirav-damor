import React from 'react'
import TweetItem from './TweetItem';
import './Tweets.css';

function Tweets(props) {
    
    return (
        <div>
            <ul className='tweets-container'
                >
                {props.displaydummyTweets.map((tweet) => (
                    <TweetItem
                    key={tweet.id}
                    id={tweet.id}
                    user={tweet.name}    
                    text={tweet.text}
                    time={tweet.time}    
                    avatar={tweet.text}
                    ></TweetItem>
                ))}
            </ul>            
        </div>
    )
}

export default Tweets;
