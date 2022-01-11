import React from 'react'
import LoginPage from './pages/LoginPage'
import TweetPage from './pages/TweetPage';
import ProfilePage from './pages/ProfilePage';
import { Switch,Route } from 'react-router-dom';
import Layout from './components/Navigation/Layout';
import TrendingPage from './pages/TrendingPage';
import ProtectedRoute from './lib/ProtectedRoute';


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

          <ProtectedRoute path='/profile' component={ProfilePage}>
          </ProtectedRoute>

          <ProtectedRoute path='/trending' component={TrendingPage} >
          </ProtectedRoute>
          
        </Switch>
      </Layout>
    </div>
  )
}

export default App;
