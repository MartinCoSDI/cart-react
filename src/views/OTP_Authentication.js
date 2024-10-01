import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser'; //have to npm install @emailjs/browser
import "./OTP_Authentication.css";
import { Link, useNavigate } from "react-router-dom";
//import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useStateValue } from "../StateProvider";


function OTP_Login() {

  const [isSignedIn, setIsSignedIn] = useState(null);
  const [{user}, dispatch] = useStateValue();
  //const [{user_email}, dispatche] = useStateValue();
  
  //adding the useState to use value from Global variable - Reducer


  const [OTP, setOTP] = useState(null);
  const [run_effect, setRun_Effect] = useState(false);

  const navigate = useNavigate();
  
  
  const [OTP_Code, setOTP_Code] = useState();
  //const [{}, dispatch] = useStateValue();


  const [temp_email, setTemp_Email] = useState('');


  //Used localStorage to save userEmail
  //This useEffect function will capture the change to userEmail, and set useremail, later can use to send email to
  useEffect(() => {

    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail){
      setTemp_Email(savedEmail);
    }
  }, []);


    const handleOTP = (event) => {
      setOTP_Code(event.target.value);
    }

  const form = useRef({
    code: '60',
    user_email: ''
  });

  //click to set the OTP code
  const sendEmail = (e) => {
    e.preventDefault();
    const getOTP = () => {
      const fetchData = async() => {
          try {
              const response = await fetch('https://martinco.pythonanywhere.com/api/pwd');
              const jsonData = await response.json();
              setOTP(jsonData.pwd);
          }
          catch(error){
              console.error('Erro fetching data:' , error);
          }
      };
      fetchData();}
    getOTP()
    //form.current.code = String(OTP)
    };

  //submit to verify the OTP code
    const signIn = (e) => {
      e.preventDefault();
  
      if (OTP_Code === String(OTP)){
        sessionStorage.setItem('condition', true)
        
        dispatch({
          type: "SET_CONDITION_REDUCER",
          user: true
        });
  
        navigate("/today");
          //console.log(user_email)

        setRun_Effect(false)
        }
      else{
        alert('Wrong OTP')
      }
    };

    //useEffect to catch the change in OTP, if the set OTP code been clicked, then set the runeffect to true, ready for another useEffect
    useEffect(() => {
      let hide_button = document.getElementById('hide_button')
      if(OTP !== null)
      {
        form.current.code = String(OTP) //assign form.current here to use for useEffect later
        setRun_Effect(true)
        //console.log(form.current.code) //remove this when in production mode
        hide_button.classList.add('hidden') //once user enter Send_email, which will set the OTP code, it will remove the button away
      }

    },[OTP])

    //adding the hidden variable here, while user not click on Send Email yet
    useEffect(() => {
      let hide_button = document.getElementById('hide_button')
      if(!run_effect)
      {
       //remove this when in production mode
        hide_button.classList.remove('hidden')
      }

    },[run_effect])
    //once the run effect turn to true, execute the to send the email. In other words, once OTP being set, then send email (needed info: dest email, and OTP code)
      //User enter 'send email', will execute API to set the OTP code and hold it first
      //Use useEffect when the OTP being updated to the new one, to send email
    
    
    //adding the send email function in here

    useEffect(() => {
      
      if (run_effect){
        emailjs
        .send('service_zzwcpnm', 'template_9t2c8uu',
          {
            code: form.current.code,
            name: "Martin's Web App",
            user_email: temp_email
            //user_email: form.current.user_email.value
          }, {
          publicKey: '6GIgnMCh6RS_DcV8A',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
        //setRun_Effect(false)
      }
    
    },[run_effect])
    
    

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__LogoContainer">
          <Link to="/">
            <img
              className="login__logo"
              src="https://www.logolynx.com/images/logolynx/0f/0f7cb486472899b42555a4acbdf7dab4.jpeg"
            />
          </Link>
        </div>
        <h1>OTP Authentication</h1>

        <form>
          <h5>OTP Code</h5>
          <input
            type="text"
            value={OTP_Code}
            onChange={handleOTP}
          />
        <div className="button-area">
          
        </div>
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
          <button
            type="submit"
            onClick={sendEmail}
            className="login__signInButton"
            id = "hide_button"
          >
            Send email
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTP_Login;

//<button onClick={getOTP}>OTP sending</button>