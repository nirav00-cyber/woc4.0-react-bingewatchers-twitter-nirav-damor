import React from 'react'
import './TrendingItem.css';
const IMAGE_BASEURL = 'http://image.tmdb.org/t/p/w780';

// sizes : 92, 154,342,185,780,300,w780,1280

function TrendingItem(props) {
    return (
        <div className='movie-container'>
            <div className='poster'>
               <img src={`${IMAGE_BASEURL}${props.poster}`} alt='poster'/>
            </div>
            <div className='show-details'>
                <h3>{props.title}</h3>
                
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default TrendingItem
