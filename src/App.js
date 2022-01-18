import React from 'react'
import LoginPage from './pages/LoginPage'
import TweetPage from './pages/TweetPage';
import ProfilePage from './pages/ProfilePage';
import { Switch,Route } from 'react-router-dom';
import Layout from './components/Navigation/Layout';
import TrendingPage from './pages/TrendingPage';
import ProtectedRoute from './lib/ProtectedRoute';
import UserProfile from './pages/UserProfile';

function App()
{

  return (
    <div>
      <Layout>
        <Switch>

            <ProtectedRoute path='/' component={TweetPage} exact>
            </ProtectedRoute>
        
          <Route path='/login' component={LoginPage}>
          </Route>
          
          <ProtectedRoute path='/home' component={TweetPage}>
          </ProtectedRoute>

          

          <ProtectedRoute path='/trending' component={TrendingPage} >
          </ProtectedRoute>
          
          <ProtectedRoute path='/userprofile/:profileId' component={UserProfile}>
          </ProtectedRoute>
        </Switch>
      </Layout>
    </div>
  )
}

export default App;
