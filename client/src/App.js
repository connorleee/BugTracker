import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import GeneralLayout from "layouts/General.js";
import AuthLayout from "layouts/Auth.js";
import PrivateRoute from "layouts/PrivateRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authLevel, setAuthLevel] = useState("");

  let token = localStorage.getItem("token");

  useEffect(() => {
    console.log(authLevel);
    console.log(
      isAuthenticated &&
        (authLevel === "developer" || authLevel === "project manager") &&
        token != null
    );
  }, [authLevel]);

  useEffect(() => {
    if (token == null) {
      setIsAuthenticated(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthLevel("");
    }
  }, [isAuthenticated]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/admin"
          render={(props) =>
            isAuthenticated && authLevel === "admin" && token != null ? (
              <AdminLayout
                {...props}
                setAuth={setAuth}
                setAuthLevel={setAuthLevel}
              />
            ) : (
              <Redirect to="/auth" />
            )
          }
        />
        <Route
          path="/general"
          render={(props) =>
            isAuthenticated &&
            (authLevel === "developer" || authLevel === "project manager") &&
            token != null ? (
              <GeneralLayout
                {...props}
                setAuth={setAuth}
                setAuthLevel={setAuthLevel}
              />
            ) : (
              <Redirect to="/auth" />
            )
          }
        />
        <Route
          path="/auth"
          render={
            (props) => {
              if (!isAuthenticated) {
                return (
                  <AuthLayout
                    {...props}
                    setAuth={setAuth}
                    setAuthLevel={setAuthLevel}
                  />
                );
              } else {
                if (authLevel === "admin") {
                  return <Redirect to="/admin" />;
                } else if (
                  authLevel === "developer" ||
                  authLevel === "project manager"
                ) {
                  return <Redirect to="/general" />;
                }
              }
            }

            // !isAuthenticated ? (
            //     <AuthLayout
            //       {...props}
            //       setAuth={setAuth}
            //       setAuthLevel={setAuthLevel}
            //     />
            //   ) : authLevel === "admin" ? (
            //     <Redirect to="/admin" />
            //   ) : (
            //     <Redirect to="/admin" />
            //   )
          }
        />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
