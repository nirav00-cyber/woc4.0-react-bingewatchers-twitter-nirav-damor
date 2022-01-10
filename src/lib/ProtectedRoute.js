import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from './AuthContext';

function ProtectedRoute({ component: Component, ...restOfProps }) {
   
    const { currentUser } = useAuth();

    
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;