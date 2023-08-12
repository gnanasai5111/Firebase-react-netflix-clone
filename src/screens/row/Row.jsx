import axios from "../../axios";
import React, { useEffect, useState } from "react";
import "./row.css";
import LazyImage from "../../LazyImage";
import Loader from "../../Loader/Loader";

function Row(props) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original";

  const { title, fetchUrl, isLargeRow = false } = props;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      {movies?.length === 0 ? (
        <Loader />
      ) : (
        <div className="row-posters">
          {movies.map((movie, index) => {
            return (
              (movie.poster_path || movie.backdrop_path) && (
                <LazyImage
                  key={movie.id}
                  alt="movie"
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  className={`row-poster ${isLargeRow && "row-poster-large"}`}
                />
              )
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Row;
