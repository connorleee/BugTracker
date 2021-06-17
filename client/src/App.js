import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import GeneralLayout from "layouts/General.js";
import AuthLayout from "layouts/Auth.js";
// import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "layouts/PrivateRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLevel, setAuthLevel] = useState("");

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token == null) {
      setIsAuthenticated(false);
    }
  }, [token]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setAuthLevel("");
  //   }
  // }, [isAuthenticated]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const layout = () => {
    if (authLevel === "admin") return <Redirect to="/admin/index" />;
    if (authLevel === "developer" || authLevel === "project manager")
      return <Redirect to="/general/index" />;
  };

  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
      <Switch>
        <Route
          path="/admin"
          render={(props) =>
            isAuthenticated && isAdmin ? (
              <AdminLayout
                {...props}
                setAuth={setAuth}
                authLevel={authLevel}
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
            isAuthenticated && !isAdmin ? (
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
                    setIsAdmin={setIsAdmin}
                  />
                );
              }
              // else {
              //   if (authLevel === "admin") {
              //     return <Redirect to="/admin" />;
              //   } else if (
              //     authLevel === "developer" ||
              //     authLevel === "project manager"
              //   ) {
              //     return <Redirect to="/general" />;
              //   }
              // }
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

        <Route exact path="/">
          {!isAuthenticated ? (
            <Redirect to="/auth" />
          ) : (
            <Redirect to="/admin/index" />
          )}
        </Route>

        {/* <Redirect from="/" to="/auth" exact /> */}

        <Route path="*">
          <h1>404 No page found</h1>
        </Route>
      </Switch>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
};

export default App;
