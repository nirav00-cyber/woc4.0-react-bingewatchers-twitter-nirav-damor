import React from 'react'
import avatar from '../../avatars/avatar.jpg';
import './TweetItem.css';
import { db } from '../../firebase'
import {deleteDoc,doc} from "firebase/firestore"
import { FaTrash,FaThumbsUp } from "react-icons/fa";
function TweetItem(props)
{
    const deleteTweetHandler = async(deleteTweetId) =>
    {
        // alert('Are You sure want to delete it');
        const tweetDoc = doc(db, "tweets", deleteTweetId);
        try
        {
            await deleteDoc(tweetDoc);
       
        } catch (err) { alert('error occured while deleting tweet') } 
        
    }   

    return (
    
            <li className='item'>
            <div className='img-container'>
                <img src={avatar} alt='avatar'/>
            </div>
            <div className='user-container'>
                <h3>@{props.user}  <small>{props.time}</small> </h3>
                <p>{props.text}</p>
                    <div className='control-icons'>
                <FaThumbsUp className='like-icon'></FaThumbsUp>
                <FaTrash onClick={()=>deleteTweetHandler(props.id)} className='trash-icon'>delete</FaTrash>
                        </div>
            </div>
            
                </li>
    )
}

export default TweetItem;
