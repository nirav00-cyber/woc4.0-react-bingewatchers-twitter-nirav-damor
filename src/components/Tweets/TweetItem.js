import React,{useState,useRef,useEffect} from 'react'
import avatar from '../../avatars/avatar.jpg';
import './TweetItem.css';
import { db } from '../../firebase'
import {updateDoc,deleteDoc,doc,getDocs,collection,setDoc,query,where} from "firebase/firestore"
import { FaTrash, FaThumbsUp, FaEdit } from "react-icons/fa";
import { useAuth } from '../../lib/AuthContext';

function TweetItem(props)
{
    const [isEditing, setIsEditing] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    let { currentUser, userInfo } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [likesInfo, setLikesInfo] = useState([]);

    useEffect(() =>
    {
        const getlikesData = async () =>
                {
                    try
                    {
                        const likesDataRef = collection(db, "likes");
                        const likesDataQuery = query(likesDataRef, where("userid", "==", currentUser.uid))
                        const likesData = await getDocs(likesDataQuery);

                        // likesData.forEach((doc) =>
                        // {
                        //     console.log(doc.data())
                        // })
                        // console.log("executed till here",likesData.docs.data)
                        setLikesInfo(likesData.docs.map(doc => ({
                            likedTweetId:doc.data().likedTweetId
                        })))
                    } catch (err)
                    {
                        console.log("errror getting likes data",err);
                    }
        }
        getlikesData()
        // console.log(likesInfo)
      
    }, [isLiked])
    
    useEffect(() => {
        if (likesInfo.find(({likedTweetId})=>likedTweetId===props.id)) 
        {
        // console.log(props.id)
            setIsLiked(true);    
        }
    }, [likesInfo])
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
        console.log('disabled');
       
        if (isLiked)
        {
            const updatelikesCountRef = doc(db, "tweets", props.id);
            const updatedLikes = { likeCount: props.likeCount - 1 };
             const deleteLikeDocRef = doc(db, "likes", currentUser.uid + props.id);
            try
            {
                await updateDoc(updatelikesCountRef, updatedLikes);
                await deleteDoc(deleteLikeDocRef);

               
            } catch (err)
            {
                console.log("likeCount update failed",err);
            }
            setIsLiked(false);   
            
        }
        else 
        {
            const updatelikesCountRef = doc(db, "tweets", props.id);
            const updatedLikes = { likeCount: props.likeCount + 1 };
            const likesCollectionRef = collection(db, "likes");
            try
            {
                await updateDoc(updatelikesCountRef, updatedLikes);
                await setDoc(doc(likesCollectionRef, currentUser.uid + props.id), {
                    userid: currentUser.uid,
                    likedTweetId:props.id
                })

            } catch (err)
            {
                console.log("likeCount update failed",err);
            }
            setIsLiked(true);    
        }
        setIsLoading(false);
        console.log("enabled");
        console.log(props.likeCount)
    }
    let likeButtonClasses = isLiked ? 'like-icon liked' : 'like-icon'
    
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
                            <button className='btn'>Confirm Edit</button>
                        </form>
                }
                    <p>{!isEditing && props.text}</p>
                </div>
                <div className='control-icons'>
                    <div>
                    <button type="button" disabled={isLoading}  className={likeButtonClasses} onClick={toggleLikeHandler}><FaThumbsUp></FaThumbsUp></button>
                        <small>{props.likeCount}</small>
                    </div>
                    <FaEdit className='edit-icon' onClick={toggleEditHandler}></FaEdit>
                <FaTrash onClick={deleteTweetHandler} className='trash-icon'>delete</FaTrash>
                        </div>
            </div>
            
                </li>
    )
}

export default TweetItem;
