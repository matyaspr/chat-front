import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { AuthContext } from "../Context/Auth/AuthContext";

import { ChatPages } from "../Pages/index";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


export const AppRouter = () => {

  const { auth, checkToken } = useContext(AuthContext);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  // if( auth.isAuthenticated ) 
  //   return <h1> Espere ... </h1>



  return (
    <Router>
        <div>
          <Switch>
            <PublicRoute 
              isAuthenticated={ auth.isAuthenticated } 
              path="/auth"
              component={ AuthRouter }  
            />
            <PrivateRoute 
              isAuthenticated={ auth.isAuthenticated }
              path="/"
              exact
              component={ ChatPages }
            />

            <Redirect 
              to="/" 
            />
            
          </Switch>
        </div>
      </Router>
  )
}
 