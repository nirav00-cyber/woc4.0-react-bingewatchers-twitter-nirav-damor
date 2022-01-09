import React from 'react'
import TrendingItem from './TrendingItem'
import './Trending.css';

function Trending(props)
{
    
    return (
        <div>
            <div className='trending-poster'>
                <h2>Find out what's New!
               </h2> 
            </div>
            <ul className='shows'>
                {props.trendingShowsData.map((show) => (
                    <TrendingItem
                        key={show.id}
                        id={show.id}
                        title={show.title}
                        releaseDate={show.releaseDate}
                        description={show.description}
                        rating={show.rating}
                        poster={show.poster}
                    >
                    </TrendingItem>
                ))}
            </ul>
        </div>
    )
}

export default Trending
