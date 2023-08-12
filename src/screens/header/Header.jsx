import React, { useEffect, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionHeader = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionHeader);
    return () => window.removeEventListener("scroll", transitionHeader);
  }, []);
  return (
    <div className={`header ${show && "header-black"}`}>
      <div className="header-contents">
        <img
        onClick={()=>navigate("/")}
          className="header-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="netflix"
        />
        <img
          onClick={() => navigate("/profile")}
          className="header-avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="netflix"
        />
      </div>
    </div>
  );
}

export default Header;
