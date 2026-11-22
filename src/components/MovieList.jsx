import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <section className="relative z-10 px-4 pb-8 sm:px-10 md:px-16">
      <h2 className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
        <span className="h-6 w-1 rounded-full bg-[#e50914]" aria-hidden="true" />
        {title}
      </h2>
      <div className="flex snap-x snap-proximity gap-3 overflow-x-auto overflow-y-hidden pb-4 sm:gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} mData={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
