import React, { useEffect, useRef, useState } from "react";
import "./signup.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Signup({ emailId }) {
  const emailRef = useRef();
  const passwordRef = useRef(null);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.value = emailId;
    }
  }, [emailId]);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((data) => {
        navigate("/home");
        emailRef.current.value = ""; // Clear email input
        passwordRef.current.value = ""; // Clear password input
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((data) => {
        navigate("/home");
        emailRef.current.value = ""; // Clear email input
        passwordRef.current.value = ""; // Clear password input
      })
      .catch((error) => {
        message.error(error.message);
      });
  };
  return (
    <div className="signup-screen">
      {isLogin ? (
        <form onSubmit={signIn}>
          <h1>Log In</h1>
          <input type="email" placeholder="Email address" ref={emailRef} />
          <input type="password" placeholder="password" ref={passwordRef} />
          <button type="submit" onClick={signIn}>
            Log In
          </button>
          <h4>
            <span className="gray">New to Netflix? </span>
            <span className="link" onClick={() => setIsLogin(false)}>
              Sign Up now.
            </span>
          </h4>
        </form>
      ) : (
        <form onSubmit={register}>
          <h1>Sign Up</h1>
          <input type="email" placeholder="Email address" ref={emailRef} />
          <input type="password" placeholder="password" ref={passwordRef} />
          <button type="submit" onClick={register}>
            Sign Up
          </button>
          <h4>
            <span className="gray">Account already exists? </span>
            <span className="link" onClick={() => setIsLogin(true)}>
              Login In now.
            </span>
          </h4>
        </form>
      )}
    </div>
  );
}

export default Signup;
