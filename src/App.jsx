import React, { useState } from "react";
import { useLocalStorageState } from "./components/hooks/useLocalStorageState";
import ErrorMessage from "./components/ErrorMessage";
import Box from "./components/Box";
import Main from "./components/Main";
import NavBar from "./components/Navbar/Navbar";
import Logo from "./components/Navbar/Logo";
import NavbarMovieLength from "./components/Navbar/NavbarMovieLength";
import MoviesList from "./components/MoviesList";
import SelectedMovieDetails from "./components/SelectedMovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import "./App.css";
import NavbarInput from "./components/Navbar/NavbarInput";
import Loader from "./components/Loader";
import { useMovies } from "./components/hooks/useMovies";

const KEY = "e9bb5f5c";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([]);

  const { movies, isLoading, error } = useMovies(query);

  // useEffect(() =>{
  //   console.log("App mounted");

  // }, [])

  // useEffect(() =>{
  //   console.log("Before unmounting");

  // })

  // console.log("App rendered");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovieDetails() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <NavbarInput query={query} setQuery={setQuery} />
        <NavbarMovieLength movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {!isLoading && !error && (
            <MoviesList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
          {isLoading && <Loader />}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovieDetails}
              onAddWatched={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// function WatchedList() {

//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />

//           <WatchedSummaryList />
//         </>
//       )}
//     </div>
//   );
// }
