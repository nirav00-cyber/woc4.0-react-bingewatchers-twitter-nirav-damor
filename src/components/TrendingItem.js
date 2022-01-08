import React from 'react'

function TrendingItem(props) {
    return (
        <div>
            <div className='poster'>

            </div>
            <div className='show-details'>
                <h3>{props.title}</h3>
                <small>Release : {props.releaseDate}</small>
                <span>Rating:{props.rating}</span>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default TrendingItem
