import React from "react";
import Movie from "./Movie";

function MoviesList({ movies, onSelectMovie }) {
    return (
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
        ))}
      </ul>
    );
  }

  export default MoviesList;