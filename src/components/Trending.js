import React from 'react'
import TrendingItem from './TrendingItem'
function Trending(props)
{
    
    return (
        <div>
            This is Trending PAge 
            <ul>
                {props.trendingShowsData.map((show) => (
                    <TrendingItem
                        key={show.id}
                        id={show.id}
                        title={show.title}
                        releasedate={show.releaseDate}
                        description={show.description}
                        rating={show.rating}
                        poster={show.poster}
                    ></TrendingItem>
                ))}
            </ul>
        </div>
    )
}

export default Trending
