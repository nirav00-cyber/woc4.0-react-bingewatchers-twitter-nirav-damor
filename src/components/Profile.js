import React from 'react'
import avatar from '../avatars/avatar.jpg';
import './Profile.css';
function Profile() {
    return (
        <div className='profile-container'>
            <div className='avatar-container'>
                <img src={avatar} alt='avatar'></img>
                <h3>Nirav123</h3>
            </div>

            <div className='details-container'>
            <div className='details-part1'>
                <div className='tweets'>
                   Tweets <p>23</p>
                </div>
                <div className='following'>
                    Following<p>123</p>
                </div>
                <div className='followers'>
                    Followers<p>123</p>
                </div>
                </div>
                <div className='details-part2'>
                    Description<p>Hi, it's me xkvbwkfe ejkfv bwekl nweklv lk vnwfklv nkl bwek nvwevkl wenv lweb nlekvwejv bakjbc wkj bjlfvbakdjvb ajdc akerugvieqvcnqjghefuqwe bn;quirghv uqn;wefb qwiudfb uadgf iawjd bind ianf cui;b 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Profile
