import React from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "Constants/routes";

const PrivateRoute = ({ component: Component, path, ...rest }) => {

  const render = () =>{
      return <Redirect to={routes.HOME} />
  }

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
