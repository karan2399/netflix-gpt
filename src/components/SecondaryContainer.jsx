import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <section
      aria-label="Movie collections"
      className="relative z-10 -mt-16 bg-[linear-gradient(to_bottom,rgba(5,5,5,0),#090909_12%,#050505_100%)] pb-6 sm:-mt-20 sm:pb-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/20 to-transparent" />
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
      <MovieList title="Popular" movies={movies?.popularMovies} />
      <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
    </section>
  );
};

export default SecondaryContainer;
