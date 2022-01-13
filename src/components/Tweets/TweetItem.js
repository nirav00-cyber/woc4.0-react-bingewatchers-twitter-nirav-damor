import React,{useState,useRef} from 'react'
import avatar from '../../avatars/avatar.jpg';
import './TweetItem.css';
import { db } from '../../firebase'
import {updateDoc,deleteDoc,doc} from "firebase/firestore"
import { FaTrash,FaThumbsUp,FaEdit } from "react-icons/fa";
function TweetItem(props)
{
    const [isEditing, setIsEditing] = useState(false);
    const editTweetRef = useRef("");
    const toggleEditHandler = () =>
    {
        setIsEditing(prevState => !prevState);
    }
    const deleteTweetHandler = async() =>
    {
        // alert('Are You sure want to delete it');
        const tweetDoc = doc(db, "tweets", props.id);
        try
        {
            await deleteDoc(tweetDoc);
       
        } catch (err) { alert('error occured while deleting tweet') } 
        
    }   
    const editTweetHandler = async (e) =>
    {
        e.preventDefault();
        console.log(props.id)
        const editDocRef = doc(db, "tweets", props.id);
        const newFields = {text:editTweetRef.current.value}
        try
        {
            await updateDoc(editDocRef,newFields);
            console.log("tweet edited");
        }
        catch (err)
        {
            console.log("tweet edited failed",err);
        }
        console.log(editTweetRef.current.value);

        setIsEditing(false);
    }

    return (
    
            <li className='item'>
            <div className='img-container'>
                <img src={avatar} alt='avatar'/>
            </div>
            <div className='user-container'>
                <h3>@{props.user}  <small>{props.time}</small> </h3>
                
                <div className='text' >
                    {isEditing && 
                        <form autoFocus   className='edit-form' onSubmit={ editTweetHandler}>
                            <textarea type="text" defaultValue={props.text} ref={editTweetRef}>
                            </textarea>
                            <button>Edit</button>
                        </form>
                }
                    <p>{!isEditing && props.text}</p>
                </div>
                    <div className='control-icons'>
                    <FaThumbsUp className='like-icon'></FaThumbsUp>
                    <FaEdit className='edit-icon' onClick={toggleEditHandler}></FaEdit>
                <FaTrash onClick={deleteTweetHandler} className='trash-icon'>delete</FaTrash>
                        </div>
            </div>
            
                </li>
    )
}

export default TweetItem;
