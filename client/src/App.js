import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainLayout from "layouts/Main.js";
import AuthLayout from "layouts/Auth.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authLevel, setAuthLevel] = useState("");

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token == null) {
      setIsAuthenticated(false);
    }
  }, [token]);

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
                />
              );
            }
          }}
        />

        <Route
          path="/"
          render={(props) =>
            isAuthenticated && token !== null ? (
              <MainLayout
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

        <Route path="*">
          <h1>404 No page found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
