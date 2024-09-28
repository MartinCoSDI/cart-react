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


import Header from "./components/Header";
import Protected from "./components/Protected";

import This from "./views/This";

import Work_Order from "./views/Work_Order_This";

import Energy from "./views/Energy";

import Requisition from "./views/Requisition";

import ML from "./views/ML";

import OTP_Login from "./views/OTP_Authentication";

import Three_D from "./views/3D";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./config/Firebase";


function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [condition, setCondition] = useState(null);

  const [{user, cond_test, user_email, user_color}, dispatch] = useStateValue();
 
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);
      console.log("THE CONDITION IS >>> ",cond_test)
      console.log("THE EMAIL IS >>> ",user_email)
      console.log("THE CONDITION IS >>> ",user)
      console.log("THE user_color IS >>> ",user_color, typeof(user_color))



      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser
        });
        setIsSignedIn(true);
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        });
        setIsSignedIn(false);
      }

      if (cond_test) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_COND",
          cond_test: true
        });
        setCondition(true);
      } else {
        // the user is logged out
        dispatch({
          type: "SET_COND",
          cond_test: null
                });
        setCondition(false);
      }
      

      
    });
  }, []);


  return (
    <div>
      {isSignedIn !== null &&
      condition !== null &&
      (
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
                  <Protected isSignedIn={cond_test}>
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
                  <Protected isSignedIn={cond_test}>
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
                  <Protected isSignedIn={cond_test}>
                    <div>
                      <Header />
                      <Week />
                    </div>
                  </Protected>
                }
              />
              <Route
                exact
                path="/thismonth"
                element={
                  <Protected isSignedIn={cond_test}>
                    <div>
                      <Header />
                      <Month />
                    </div>
                  </Protected>
                }
              />
              <Route
                exact
                path="/thisyear"
                element={
                  <Protected isSignedIn={cond_test}>
                    <div>
                      <Header />
                      <Year />
                    </div>
                  </Protected>
                  
                }
              />

              <Route
                exact
                path="/this"
                element={
                  <Protected isSignedIn={cond_test}>
                    <div>
                      <Header />
                      <This holding_color = {user_color}/>
                    </div>
                  </Protected>
                }
              />

              <Route
                exact
                path="/workorder"
                element={
                  <Protected isSignedIn={cond_test}>
                    <div>
                      <Header />
                      <Work_Order />
                    </div>
                  </Protected>
                }
              />

<Route
                exact
                path="/energy"
                element={
                  <Protected isSignedIn={cond_test}>
                    <div>
                      <Header />
                      <Energy />
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
                path="/ML"
                element={
                  <Protected isSignedIn={cond_test}>
                    <div>
                      <Header />
                      <ML />
                    </div>
                  </Protected>
                }
              />

              <Route
                exact
                path="/3D_Model"
                element={
                  <Protected isSignedIn={cond_test}>
                    <div>
                      <Header />
                      <Three_D />
                    </div>
                  </Protected>
                }
              />

              <Route
                exact
                path="/OTP_Auth"
                element={
                  <Protected isSignedIn={isSignedIn}>
                    <div>
                      <OTP_Login />
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
