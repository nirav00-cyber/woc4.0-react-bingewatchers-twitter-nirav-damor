import React, {useState,useEffect} from 'react'
import Trending from '../components/Trending/Trending'

const TMDB_API = 'https://api.themoviedb.org/3/trending/all/day?api_key=417ae7fd956736f41db826d383085158';



function TrendingPage()
{
    const [trendingShows, setTrendingShows] = useState([]);

    useEffect(() =>
    {
    async function fetchTrending()
    {
    let dummyShows = [];
    const response = await fetch(TMDB_API);
    const data = await response.json();
    if (!response.ok)
    {
        alert('Error Occurred while fetching Data');
        return;
    }
    // console.log(data);
    const shows = data.results;
    for(let show in shows)
    {
        const showObj = {
            id: shows[show].id,
            title: shows[show].title,
            releaseDate: shows[show].release_date,
            description:shows[show].overview,
            rating: shows[show].vote_average,   
            poster:shows[show].backdrop_path
        }    
        dummyShows.push(showObj);
        }
        setTrendingShows(dummyShows);
    // console.log(dummyShows);    
    }
    fetchTrending();
    
    },[]);
    return (
        <>
            <Trending trendingShowsData={trendingShows}></Trending>
        </>
    )
}

export default TrendingPage;