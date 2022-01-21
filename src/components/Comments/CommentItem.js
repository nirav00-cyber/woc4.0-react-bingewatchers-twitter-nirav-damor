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
            
        </div>                
                    
            <p><b>{props.name}</b>  {props.comment}</p>
        
        
    </li>);
}

export default CommentItem;
