import React from 'react'
import avatar from '../../avatars/avatar.jpg';
import './Profile.css';



function Profile(props)
{
  
    // console.log(props.userProfile.username);  
    return (
        <div className='profile-container'>
            <div className='avatar-container'>
                <img src={avatar} alt=""></img>
                <h3>{props.userProfile.username}</h3>
            </div>
            <div className='details-part1'>
                <div className='tweets'>
                   Tweets
                        <p>{props.userProfile.tweetCount}</p>
                </div>
                <div className='following'>
                        Following<p>{props.userProfile.following}</p>
                </div>
                <div className='followers'>
                        Followers<p>{props.userProfile.followers}</p>
                </div>
            </div>
                <div className='details-part2'>
                    Description<p>xkvbwkfe ejkfv bwekl nweklv lk vnwfklv nkl bwek nvwevkl wenv lweb nlekvwejv bakjbc wkj bjlfvbakdjvb ajdc akerugvieqvcnqjghefuqwe bn;quirghv uqn;wefb qwiudfb uadgf iawjd bind ianf cui;b 
                    </p>
                </div>
            </div>
        
    )
}

export default Profile
