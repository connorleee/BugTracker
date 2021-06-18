import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
// import { AuthProvider } from "./contexts/AuthContext";

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

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/auth"
          render={(props) => {
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
          }}
        />

        <Route
          path="/"
          render={(props) =>
            isAuthenticated && token !== null ? (
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

        {/* <Route exact path="/">
          {!isAuthenticated ? (
            <Redirect to="/auth" />
          ) : (
            <Redirect to="/admin/index" />
          )}
        </Route> */}

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
