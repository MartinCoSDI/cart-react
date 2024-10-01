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
import { cond } from "three/webgpu";



function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [condition, setCondition] = useState(null);

  const [{user, condition_reducer}, dispatch] = useStateValue();

  const [condition_1, setCondition_1] = useState(false);

  useEffect(() => {
    const savedCondition = sessionStorage.getItem('condition');
    setCondition_1(savedCondition);
    //console.log(savedCondition)
  
  })

  useEffect(() => {
    // will only run once when the app component loads...
    if (condition_1){
      
      setCondition(true);
      //console.log(user.condition_reducer)
      }
    }, [condition_1]);
 

    useEffect(() => {
      // will only run once when the app component loads...
  
      auth.onAuthStateChanged((authUser) => {  
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
      });
    }, []);
 

  return (
    <div>
      {isSignedIn !== null &&
      //condition_1 !== null &&
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
                  <Protected isSignedIn={condition_1}>
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
                  <Protected isSignedIn={condition_1}>
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
                  <Protected isSignedIn={condition_1}>
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
                  <Protected isSignedIn={condition_1}>
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
                  <Protected isSignedIn={condition_1}>
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
                  <Protected isSignedIn={condition_1}>
                    <div>
                      <Header />
                      <This/>
                    </div>
                  </Protected>
                }
              />

              <Route
                exact
                path="/workorder"
                element={
                  <Protected isSignedIn={condition_1}>
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
                  <Protected isSignedIn={condition_1}>
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
                  <Protected isSignedIn={condition_1}>
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
                  <Protected isSignedIn={condition_1}>
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
      ) }
    </div>
  );
}

export default App;


//modified note:
//Added sessionStorage and LocalStorage for condition and UserEmail
//applied in OTP authentication, and login and header


//bug: there was a bug that refresh the page will not keep the value,
//fixed: added more useEffect in App.js