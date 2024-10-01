import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../config/Firebase";
import { Link, useNavigate } from "react-router-dom";
import reducer_s from "../reducer";
import Three_D_Temp from "../views/3D copy";
function Header() {
  const navigate = useNavigate();

  const navRef = useRef();
  //const [{ user, cond_test }, dispatch] = useStateValue();
  const [{user, cond_test, user_email, user_color, user_point_text, test}, dispatch] = useStateValue();

  const [condition, setCondition] = useState(null);

  useEffect(() => {
    const savedCondition = sessionStorage.getItem('condition');
    setCondition(savedCondition);
  
  })

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
    if (user_color !== null || user_point_text != null || test != null){
        
      dispatch({
        type: "SET_COLOR",
        user: null
        });
      dispatch({
        type: "SET_POINT_TEXT",
        user: null
        });
      dispatch({
        type: "SET_TEST",
        user: null
        });
  };}

  const handleAuthenticaton = () => {
    if (user) {
      navigate("/react-project");

      localStorage.removeItem('userEmail');
      sessionStorage.removeItem('condition');
      auth.signOut();

    }
    showNavbar();
  };

  //console.log(user)
  //console.log(cond_test)


  return (
    <div className="navbar">
      <header>
        <Link to="/react-project">
        <Link to="/react-project">
          <img
            className="header_logo"
            src="https://www.logolynx.com/images/logolynx/0f/0f7cb486472899b42555a4acbdf7dab4.jpeg"
            alt="header_logo"
          />
        </Link>

        </Link>

        <nav ref={navRef}>
          <Link onClick={showNavbar} to="/react-project" className="nav-element">
            <p>Home</p>
          </Link>
          {
            user ? (
              cond_test ?  (
                <Link onClick={showNavbar} to="/dashboard" className="nav-element hid">
                  <p>Dashboard</p>
                </Link>
              ) : null
            ) : null}

          {user ? 
          (
            condition ? (
              <Link onClick={showNavbar} to="/today" className="nav-element">
                <p>Today</p>
              </Link>
            ) : null
          ): null}

          

          {user ? (
            condition ? (
              <Link onClick={showNavbar} to="/this" className="nav-element">
                <p>Purchase Order</p>
              </Link>
            ) : null
          ) : null}

          {user ? (
            condition ? (
              <Link onClick={showNavbar} to="/workorder" className="nav-element">
                <p>Workorder</p>
              </Link>
            ) : null
          ) : null}

          {user ? (
            condition ?
            (
              <Link onClick={showNavbar} to="/energy" className="nav-element">
                <p>Energy</p>
              </Link>
            ) : null
          ): null}

          {user ? (
            condition ? (
              <Link onClick={showNavbar} to="/requisition" className="nav-element hide">
                <p>Requisition</p>
              </Link>
            ) : null
          ) : null}

          {user ? (
            condition ? (
              <Link onClick={showNavbar} to="/ML" className="nav-element">
                <p>ML</p>
              </Link>
            ) : null
          ) : null}

          {user ? (
            condition ? (
              <Link onClick={showNavbar} to="/3D_Model" className="nav-element hide">
                <p>3D Model</p>
              </Link>
            ) : null
          ) : null}

          {user ? (
            condition ? (
              <div className="dropdown hid">
                <button className="dropbtn">Other Report
                </button>
                <div className="dropdown-content">
                  <Link onClick={showNavbar} to="/thisweek" className="nav-element hid">
                    <p>This Week</p>
                  </Link>

                  <Link onClick={showNavbar} to="/thismonth" className="nav-element hid">
                    <p>This Month</p>
                  </Link>

                  <Link onClick={showNavbar} to="/thisyear" className="nav-element hid">
                    <p>This Year</p>
                  </Link>

                </div>
              </div>
            ) : null
          ) : null}

          {user ? (
            !condition ? (
              <Link onClick={showNavbar} to="/OTP_Auth" className="nav-element">
                <p>OTP_Authentication</p>
              </Link>
            ) : null
          ) : null}

          <Link to={!user && "/login"} className="nav-element">
            <div onClick={handleAuthenticaton} className="signin_but">
              <p>{user ? "Sign Out" : "Sign In"}</p>
            </div>
          </Link>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
           
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          Menu
        </button>
      </header>
    </div>
  );
}

export default Header;
