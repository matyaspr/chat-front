import { Redirect, Route, Switch } from "react-router-dom";
import { LoginPages, RegisterPages } from "../Pages";

import "../css/login-register.css";


export const AuthRouter = () => {
  return (

    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          
          <Switch>
              <Route path="/auth/login" component={ LoginPages } exact />
              <Route path="/auth/register" component={ RegisterPages } />
              <Redirect to="/auth/login" />
          </Switch>

        </div>
      </div>
    </div>
				

  )
}
