import React, { useEffect, useState } from "react";
import "./login.css";
import Signup from "../signup/Signup";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [signIn, setSignIn] = useState(false);
  const [emailId, setEmailId] = useState(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
    if (isValidEmail(emailId)) {
      setSignIn(true);
    } else {
      message.error("Please enter a valid email");
    }
  };
  const userReducer = useSelector((state) => state.userReducer);
console.log(userReducer)
  useEffect(() => {
    if (userReducer?.user) {
      navigate("/home"); // Redirect after rendering
    } else {
      navigate("/");
    }
  }, [userReducer, navigate]);
  return (
    <div className="login-screen">
      <div className="login-background">
        <img
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="login"
          className="login-screen-logo"
        />
        <button className="login-btn" onClick={(e) => sendEmail(e)}>
          Sign In
        </button>
        <div className="login-screen-gradinet"></div>
      </div>
      <div className="login-body">
        {signIn ? (
          <Signup emailId={emailId} />
        ) : (
          <>
            <h1>Unlimited Films,Tv programs and more.</h1>
            <h2>Watch Anywhere. Cancel at anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="login-input">
              <form>
                <input
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <button className="start-btn" onClick={(e) => sendEmail(e)}>
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
