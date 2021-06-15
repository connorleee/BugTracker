import React from "react";
import { Redirect, Route } from "react-router-dom";
import AdminLayout from "./Admin";
import GeneralLayout from "./General";

function PrivateRoute({ authLevel, ...rest }) {
  let path;

  if (authLevel === "admin") {
    path = "/admin";
  } else if (authLevel === "developer" || authLevel === "project manager") {
  }

  return (
    <Route
    //   {...rest}
    //   path={path}
    //   render={(props) => {
    //     if (authLevel === "admin") {
    //       return (
    //         <AdminLayout
    //           {...props}
    //           setAuth={setAuth}
    //           setAuthLevel={setAuthLevel}
    //         />
    //       );
    //     } else if (
    //       authLevel === "developer" ||
    //       authLevel === "project manager"
    //     ) {
    //       return (
    //         <GeneralLayout
    //           {...props}
    //           setAuth={setAuth}
    //           setAuthLevel={setAuthLevel}
    //         />
    //       );
    //     } else {
    //       return <Redirect to="/auth" />;
    //     }
    //   }}
    />
  );
}

export default PrivateRoute;
