import React, { useEffect, useState } from "react";
import StarRating from "./../StarRating";
import Loader from "./Loader";


const KEY = "e9bb5f5c";

function SelectedMovieDetails({
    selectedId,
    onCloseMovie,
    onAddWatched,
    watched,
  }) {
    const [movieDetails, setMovieDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");
  
    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  
    const watchedUserRating = watched.find(
      (movie) => movie.imdbID === selectedId
    )?.userRating;
  
    const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
    } = movieDetails;
  
    function handleAdd() {
      const newWatchedMovie = {
        imdbID: selectedId,
        title,
        year,
        poster,
        runtime: Number(runtime.split(" ")[0]),
        imdbRating: Number(imdbRating),
        userRating,
      };
  
      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }
  
    useEffect(() => {
      const callBack = (e) => {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      };
  
      document.addEventListener("keydown", callBack);
  
      return () => {
        document.removeEventListener("keydown", callBack);
      };
    }, [onCloseMovie]);
  
    useEffect(() => {
      async function fetchMovieDetails() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          const data = await res.json();
          setMovieDetails(data);
          setIsLoading(false);
          if (data.Response === "False") throw new Error("Movie not found");
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movie details");
          }
        } catch (err) {
          if (err.name === "AbortError") {
            return;
          }
          if (err.message === "Failed to fetch") {
            console.log("Network error");
            return;
          }
          console.error(err);
        }
      }
  
      fetchMovieDetails();
    }, [selectedId]);
  
    useEffect(() => {
      document.title = `Titan Movies | ${title || "Loading..."}`;
  
      return () => {
        document.title = "Titan Movies";
      };
    }, [title]);
  
    return (
      <div className="detail">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <img src={poster} alt={`${title} poster`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  <span>{imdbRating} IMDb rating</span>
                </p>
                <button className="btn-back" onClick={onCloseMovie}>
                  &larr;
                </button>
              </div>
            </header>
  
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You rated this movie {watchedUserRating} <span> ⭐</span>{" "}
                  </p>
                )}
              </div>
  
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    );
  }

  export default SelectedMovieDetails;