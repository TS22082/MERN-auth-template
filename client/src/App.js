import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";

function App() {
  const [user, setUser] = useState({ email: "", id: null });

  const logout = () => {
    setUser({ email: "", id: null });
    axios.get("/logout");
  };

  const checkUser = () => {
    axios
      .get("/api/user_data")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => console.log("no auth"));
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    user.email ? console.log("authed") : console.log("not authed");
  }, [user]);

  return (
    <div className="App">
      <Router>
        {!user.email ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        )}

        <Switch>
          <Route path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register user={user} setUser={setUser} />
          </Route>
          <Route path="/">
            <Home user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
