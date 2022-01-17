import React from 'react'
import Trending from '../components/Trending/Trending'
import { useAuth } from '../lib/AuthContext';

function TrendingPage()
{
    const { trendingShows } = useAuth();
    return (
        <>
            <Trending trendingShowsData={trendingShows}></Trending>
        </>
    )
}

export default TrendingPage;