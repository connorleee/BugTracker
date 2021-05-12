import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
          path="/admin"
          render={(props) =>
            isAuthenticated && token != null ? (
              <AdminLayout {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/auth" />
            )
          }
        />
        <Route
          path="/auth"
          render={(props) =>
            !isAuthenticated ? (
              <AuthLayout {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/admin" />
            )
          }
        />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
