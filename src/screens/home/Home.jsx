import React from "react";
import "./home.css";
import Header from "../header/Header";
import BackgroundBanner from "../banner/BackgroundBanner";
import Row from "../row/Row";
import requests from "../../request";

function Home() {
  return (
    <div className="home-screen">
      <Header />
      <BackgroundBanner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Telugu Movies" fetchUrl={requests.fetchTeluguMovies} />

      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default Home;
