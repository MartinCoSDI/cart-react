import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Week from "./views/ThisWeek";

import Today from "./views/Today";

import Month from "./views/ThisMonth";
import Year from "./views/ThisYear";


import Profile from "./views/Profile";
import Header from "./components/Header";
import Protected from "./components/Protected";

import This from "./views/This";

import Work_Order from "./views/Work_Order_This"

import Requisition from "./views/Requisition";

import ML from "./views/ML";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./config/Firebase";


function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        setIsSignedIn(true);
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
        setIsSignedIn(false);
      }
    });
  }, []);

  return (
    <div>
      {isSignedIn !== null && (
        <Router>
          <div className="app">
            <Routes>
              <Route
                exact
                path="/react-project"
                element={
                  <div>
                    <Header />
                    <Home />
                  </div>
                }
              />
              <Route
                exact
                path="/dashboard"
                element={
                  <Protected isSignedIn={isSignedIn}>
                    <div>
                      <Header />
                      <Dashboard />
                    </div>
                  </Protected>
                }
              />
              <Route
                exact
                path="/today"
                element={
                  <Protected isSignedIn={isSignedIn}>
                    <div>
                      <Header />
                      <Today />
                    </div>
                  </Protected>
                }
              />

              <Route
                exact
                path="/thisweek"
                element={
                  <div>
                    <Header />
                    <Week />
                  </div>
                }
              />
              <Route
                exact
                path="/thismonth"
                element={
                  <div>
                    <Header />
                    <Month />
                  </div>
                }
              />
              <Route
                exact
                path="/thisyear"
                element={
                  <div>
                    <Header />
                    <Year />
                  </div>
                }
              />

              <Route
                exact
                path="/this"
                element={
                  <Protected isSignedIn={isSignedIn}>
                    <div>
                      <Header />
                      <This />
                    </div>
                  </Protected>
                }
              />

              <Route
                exact
                path="/work_order"
                element={
                  <Protected isSignedIn={isSignedIn}>
                    <div>
                      <Header />
                      <Work_Order />
                    </div>
                  </Protected>
                }
              />

              <Route
                exact
                path="/requisition"
                element={
                  <div>
                    <Header />
                    <Requisition />
                  </div>
                }
              />

              <Route
                exact
                path="/profile"
                element={
                  <Protected isSignedIn={isSignedIn}>
                    <div>
                      <Header />
                      <Profile />
                    </div>
                  </Protected>
                }
              />

              <Route
                exact
                path="/ML"
                element={
                  <Protected isSignedIn={isSignedIn}>
                    <div>
                      <Header />
                      <ML />
                    </div>
                  </Protected>
                }
              />

              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
