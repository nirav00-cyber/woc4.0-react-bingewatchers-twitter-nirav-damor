import React,{useRef} from 'react';
import CommentItem from './CommentItem';
import './Comments.css'
import { db } from '../../firebase'
import {collection, addDoc } from "firebase/firestore"

import { useAuth } from '../../lib/AuthContext';
function Comments(props)
{
    // console.log(props.tweetId);
    
    const { userInfo } = useAuth();
    const commentInputRef = useRef('');
    const addCommentHandler = async(e) =>
    {
        e.preventDefault();
        const commentsCollectionRef = collection(db, "tweets", props.tweetId, "comments");
        try
        {
            await addDoc(commentsCollectionRef, { name: userInfo.username, comment: commentInputRef.current.value });
            // commentInputRef.current.reset();
            
        } catch (err)
        {
            console.log("adding comment failed",err);
            
        }
    }
    return <div>
        
        <ul className='comments-container'>
            <form className='comment-input-form' onSubmit={addCommentHandler}>
            <textarea id='comment' rows='3' ref={commentInputRef} placeholder='Enter Your Comment Here'></textarea>
            <button className='btn' type='submit'>comment</button>
        </form>
            {props.commentsInfo.map((comment) =>
            (
                <CommentItem
                    key={comment.id}
                    id={comment.id}
                    name={comment.name}
                    comment={comment.comment}>
                    </CommentItem>   
            ))}
      </ul>
  </div>;
}

export default Comments;
