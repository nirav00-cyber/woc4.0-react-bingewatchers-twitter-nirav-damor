import React from 'react'

import Tweets from '../components/Tweets';

const DUMMY_TWEETS = [
    { id: 't1', user: 'nirav0', text: 'so you are saying that you are from different universe sdfvwe w vwe vwe wevk jb jbew iurb fwuie bwieu ubkwejb kjweb wjk bwjk b wjkwebrfjkb ejkbwej bwj bk', time: '2h ago',avatar:'/avatars/avatar.jpg' },
    { id: 't2', user: 'nirav1', text: 'so you are saying that you are from different universe', time: '1h ago',avatar:'../avatars/avatar.jpeg' },
    { id: 't3', user: 'nirav2', text: 'so you are saying that you are from different universe', time: '0h ago',avatar:'../avatars/avatar.jpeg' }
];

function TweetPage() {
    return (
        <Tweets dummyTweets={DUMMY_TWEETS}></Tweets>
    );
}

export default TweetPage
