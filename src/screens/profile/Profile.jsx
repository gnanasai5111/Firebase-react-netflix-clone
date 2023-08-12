import React from "react";
import "./profile.css";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import Plans from "../plans/Plans";

function Profile() {
  const userReducer = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const handleSignout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="profile-screen">
      <Header />
      <div className="body">
        <h1>Edit Profile</h1>
        <div className="info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="icom"
          />
          <div className="details">
            <h2>{userReducer?.email}</h2>
            <div className="plans">
              <h3>Plans</h3>
              <Plans />
              <button className="sign-out" onClick={() => handleSignout()}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
