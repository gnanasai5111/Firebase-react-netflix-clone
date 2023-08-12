import React, { useEffect, useState } from "react";
import "./background-banner.css";
import axios from "../../axios";
import requests from "../../request";

function BackgroundBanner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);


  const truncateText = (text, n) => {
    return text?.length > n ? text.substring(0, n - 1) + "..." : text;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <div className="banner-desc">
          {truncateText(movie?.overview, 150)}
        </div>
      </div>
      <div className="banner-fadebottom"></div>
    </header>
  );
}

export default BackgroundBanner;
