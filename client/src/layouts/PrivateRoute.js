import React from "react";
import { Redirect, Route } from "react-router-dom";
import AdminLayout from "./Admin";
import GeneralLayout from "./General";

function PrivateRoute({ isAuth, authLevel, ...rest }) {
  let path;

  if (authLevel === "admin") {
    path = "/admin";
  } else if (authLevel === "developer" || authLevel === "project manager") {
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuth) {
          return (
            <Redirect
              to={{ pathname: "/auth", state: { from: props.location } }}
            />
          );
        }

        if (authLevel === "admin") {
          return (
            <AdminLayout
              {...props}
              //   setAuth={setAuth}
              //   setAuthLevel={setAuthLevel}
            />
          );
        } else if (
          authLevel === "developer" ||
          authLevel === "project manager"
        ) {
          return (
            <GeneralLayout
              {...props}
              //   setAuth={setAuth}
              //   setAuthLevel={setAuthLevel}
            />
          );
        } else {
          return <Redirect to="/auth" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
