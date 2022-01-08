import React from 'react'
import avatar from '../avatars/avatar.jpg';
import './TweetItem.css';

function TweetItem(props) {
    return (
        <li className='item'>
            <div className='img-container'>
                <img src={avatar} alt='avatar'/>
            </div>
            <div className='user-container'>
                <h3>@{props.user}  <small>{props.time}</small> </h3>
                <p>{props.text}</p>
            </div>
            
        </li>
    )
}

export default TweetItem;
