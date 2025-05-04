import React, { useEffect, useState } from "react";


const KEY = "e9bb5f5c";

export function useMovies(query, callback){
const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

    useEffect(
        function() {
            callback?.()

      
        const controller = new AbortController();
    
        async function fetchMovies() {
          try {
            setIsLoading(true);
            setError("");
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
              { signal: controller.signal }
            );
    
            if (!res.ok)
              throw new Error("Something went wrong with fetching movies");
    
            const data = await res.json();
            if (data.Response === "False") throw new Error("Movie not found");
    
            setMovies(data.Search);
            setError("");
            console.log(data.Search);
          } catch (err) {
            if (err.name !== "AbortError") {
              setError(err.message);
            }
          } finally {
            setIsLoading(false);
          }
        }
        // handleCloseMovieDetails();
        fetchMovies();
    
        return () => {
          controller.abort();
    
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
        };
      }, [query]);

      return {movies, isLoading, error}
}