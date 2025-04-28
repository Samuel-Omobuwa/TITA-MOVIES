
function WatchedMovie({ movie, onDeleteWatched }) {
    return (
      <li>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.year}</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => onDeleteWatched(movie.imdbID)}
          >
            X
          </button>
        </div>
      </li>
    );
  }

  export default WatchedMovie;