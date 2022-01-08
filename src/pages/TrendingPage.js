import React from 'react'
import Trending from '../components/Trending'

const TMDB_API = 'https://api.themoviedb.org/3/trending/all/day?api_key=417ae7fd956736f41db826d383085158';

const trendingShows = [];
async function fetchTrending()
{
    const response = await fetch(TMDB_API);
    const data = await response.json();
    if (!response.ok)
    {
        alert('Error Occurred while fetching Data');
        return;
    }
    const shows = data.results;
    for(let show in shows)
    {
        const showObj = {
            id: shows[show].id,
            title: shows[show].title,
            releaseData: shows[show].release_date,
            description:shows[show].overview,
            rating: shows[show].vote_average,   
            poster:shows[show].backdrop_path
        }    
        trendingShows.push(showObj);
    }
    console.log(trendingShows);
}

function TrendingPage() {
    return (
        <div>
            <Trending trendingShowsData={trendingShows}/>
            <button onClick={fetchTrending}>Fetch Trending</button>
        </div>
    )
}

export default TrendingPage
