import React, { useState, useRef, useEffect } from 'react'
import {Link} from 'react-router-dom'
import avatar from '../../avatars/avatar.jpg';
import './TweetItem.css';
import { db } from '../../firebase'
import {updateDoc,deleteDoc,doc,collection,setDoc,onSnapshot} from "firebase/firestore"
import { FaTrash, FaThumbsUp, FaEdit ,FaComment} from "react-icons/fa";
import { useAuth } from '../../lib/AuthContext';
import Comments from '../Comments/Comments';
function TweetItem(props)
{
    const [isEditing, setIsEditing] = useState(false);
    let { currentUser, userInfo } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likesInfo, setLikesInfo] = useState([]);
    const [commentsInfo, setCommentsInfo] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const editTweetRef = useRef("");

    

    
    useEffect(() =>
    {
        const likesCollectionRef = collection(db, "tweets", props.id, "likedBy");
        onSnapshot(likesCollectionRef, (snapshot) =>
        { 
            setLikesInfo(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
                
        })
        const commentsCollectionRef = collection(db, "tweets", props.id, "comments");
        onSnapshot(commentsCollectionRef, (snapshot) =>
        {
         
            setCommentsInfo(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
                
        })
        return () =>
        {
            setLikesInfo([]);
            setCommentsInfo([]);
        }
    }, [props.id])

    useEffect(() =>
    {
        if (likesInfo.find(({userid})=>userid===currentUser.uid)) 
        {
        // console.log(props.id)
            setIsLiked(true);    
        }
    }, [currentUser.uid, likesInfo])
    
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
        const updateTweetCountRef = doc(db, "profile", currentUser.uid);
        try
        {
            const updateDocData = { tweetCount: userInfo.tweetCount - 1 }
            
            await updateDoc(updateTweetCountRef, updateDocData);
            userInfo.tweetCount=userInfo.tweetCount-1
        } catch (err)
        {
            console.log('updating tweetcount in profile failed');
        }
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
    const toggleLikeHandler = async () =>
    {
        setIsLoading(true);
        if (isLiked)
        {
            const deleteLikeRef = doc(db, "tweets", props.id, "likedBy", currentUser.uid + props.id);
            const updateLikeCountRef = doc(db, "tweets", props.id);
            const updatedLikeCount = { likeCount: props.likeCount - 1 };
            try
            {
                await updateDoc(updateLikeCountRef, updatedLikeCount);
                await deleteDoc(deleteLikeRef);
            } catch (err)
            {
                console.log("decreasing like count failed",err);
            }
            setIsLiked(false);
        }
        else
        {
            const likesCollectionRef = collection(db, "tweets", props.id, "likedBy");
            const updateLikeCountRef = doc(db, "tweets", props.id);
            const updatedLikeCount = { likeCount: props.likeCount + 1 };
            try
            {
                await updateDoc(updateLikeCountRef, updatedLikeCount);
                await setDoc(doc(likesCollectionRef, currentUser.uid + props.id), {
                    name: props.name,
                    userid:currentUser.uid
                })
            } catch (err)
            {
                console.log("increasing like count failed",err);
                
            }
            setIsLiked(true);
        }
        setIsLoading(false);
    }
    const toggleShowCommentsHandler = () =>
    {
        setShowComments(prevState => !prevState);
    }
    let likeButtonClasses = isLiked ? 'like-icon liked' : 'like-icon'
    const isMyTweet = (props.userid===currentUser.uid)
 

    
    return (
    <li className='tweetItem-container'>

            <div className='item'>

            <div className='img-container'>
                <img src={avatar} alt='avatar'/>
            </div>
            <div className='user-comment-container'>
            <div className='user-container'>
                <h3 >
                <Link to={`/userprofile/${props.userid}`}>    
                       @{props.name}
                   </Link>
                    <small>{props.time}</small>
                </h3>
                
                <div className='text' >
                    {isEditing && 
                        <form autoFocus   className='edit-form' onSubmit={ editTweetHandler}>
                            <textarea type="text" defaultValue={props.text} ref={editTweetRef}>
                            </textarea>
                            <button className='btn'>Confirm Edit</button>
                        </form>
                }
                    <p>{!isEditing && props.text}</p>
                </div>
           
           

                <div className='control-icons'>
                   
                    <div className='like-icon-container'>
                    <button type="button" disabled={isLoading} className={likeButtonClasses} onClick={toggleLikeHandler}><FaThumbsUp></FaThumbsUp></button>
                        <small>{props.likeCount}</small>
                    </div>
                        
                    <div className='comment-icon-container'>
                        <FaComment className='comment-icon' onClick={toggleShowCommentsHandler}></FaComment>
                        <small>{commentsInfo.length}</small>
                    </div>
                    <div className='edit-delete-icons'>
                    {
                        isMyTweet &&
                    
                                    <FaEdit className='edit-icon' onClick={toggleEditHandler}></FaEdit>
                                    
                        }
                    </div>
                    <div>
                    {isMyTweet &&
                        <FaTrash onClick={deleteTweetHandler} className='trash-icon'>delete</FaTrash>
                    }
                    </div>
                    </div> 
                        
                    </div>
                    {showComments && 
                     <div className='show-comments-container'> 
                        <Comments commentsInfo={commentsInfo} tweetId={props.id}></Comments>
                    </div>}
                </div>
                </div>
          
                   
        </li>
    )
}

export default TweetItem;
