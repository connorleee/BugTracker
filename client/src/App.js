import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import NonAdminLayout from "layouts/NonAdmin.js";
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
            isAuthenticated && token != null ? (
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
        {/* <Route
          path="/general"
          render={(props) =>
            isAuthenticated && token != null ? (
              <NonAdminLayout
                {...props}
                setAuth={setAuth}
                setAuthLevel={setAuthLevel}
              />
            ) : (
              <Redirect to="/auth" />
            )
          }
        /> */}
        <Route
          path="/auth"
          render={(props) =>
            !isAuthenticated ? (
              <AuthLayout
                {...props}
                setAuth={setAuth}
                setAuthLevel={setAuthLevel}
              />
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
