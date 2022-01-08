import React from 'react'
import LoginPage from './pages/LoginPage'
import TweetPage from './pages/TweetPage';
import ProfilePage from './pages/ProfilePage';
import { Switch,Route } from 'react-router-dom';
import Layout from './components/Layout';
import TrendingPage from './pages/TrendingPage';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/login'>
            <LoginPage></LoginPage>
          </Route>
          <Route path='/home'>
            <TweetPage></TweetPage>
          </Route>
          <Route path='/profile'>
            <ProfilePage></ProfilePage>
          </Route>
          <Route path='/trending'>
            <TrendingPage></TrendingPage>
          </Route>
          <Route path='*'>
            <TweetPage></TweetPage>
          </Route>
        </Switch>
      </Layout>
    </div>
  )
}

export default App;
