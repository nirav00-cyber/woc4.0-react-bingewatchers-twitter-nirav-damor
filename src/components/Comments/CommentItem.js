import React from 'react';
import avatar from '../../avatars/avatar.jpg';
import './CommentItem.css';
function CommentItem(props)
{
        // console.log(props.name);
    
    return (
        
    <li className='comment-item-container'>
        
        <div className='comment-img-container'>


            <img src={avatar} alt='avatar' />
            <h4>{props.name}</h4>
        </div>                
                    
        <p>{props.comment}</p>
        
        
    </li>);
}

export default CommentItem;
