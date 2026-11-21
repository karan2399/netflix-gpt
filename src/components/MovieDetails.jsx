import { Link, useParams } from "react-router-dom";
import {
  BACKDROP_PATH,
  BG_IMAGE,
  NETFLIX_LOGO,
  POSTER_PATH,
} from "../utils/constants";
import useMovieDetails from "../utils/hooks/useMovieDetails";

const DetailPageState = ({ message, loading = false }) => (
  <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-white">
    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111]/90 p-8 text-center shadow-2xl sm:p-12">
      {loading ? (
        <div
          className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#e50914]"
          role="status"
          aria-label="Loading movie details"
        />
      ) : (
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-300">
          Movie details
        </p>
      )}
      <p className="text-sm leading-relaxed text-white/70 sm:text-base">
        {message}
      </p>
      <Link
        className="mt-8 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-white/85"
        to="/browse">
        Back to browse
      </Link>
    </div>
  </main>
);

const MovieDetails = () => {
  const { id } = useParams();
  const { movie, isLoading, error } = useMovieDetails(id);

  if (isLoading) {
    return <DetailPageState message="Loading movie details..." loading />;
  }

  if (error || !movie) {
    return (
      <DetailPageState message={error || "No movie details were returned."} />
    );
  }

  const title = movie.title ?? movie.original_title ?? "Untitled movie";
  const tagline = movie.tagline;
  const overview = movie.overview || "No synopsis is available for this title.";
  const releaseYear = movie.release_date?.slice(0, 4) ?? "—";
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "—";
  const rating =
    typeof movie.vote_average === "number"
      ? `${movie.vote_average.toFixed(1)} / 10`
      : "—";
  const match =
    typeof movie.vote_average === "number"
      ? `${Math.round(movie.vote_average * 10)}% Score`
      : null;
  const genres = movie.genres?.length
    ? movie.genres.map((genre) =>
        typeof genre === "string" ? genre : genre.name,
      )
    : [];
  const backdrop = movie.backdrop_path
    ? BACKDROP_PATH + movie.backdrop_path
    : BG_IMAGE;
  const poster = movie.poster_path ? POSTER_PATH + movie.poster_path : null;
  const metadata = [
    match,
    releaseYear !== "—" ? releaseYear : null,
    movie.original_language?.toUpperCase(),
    runtime !== "—" ? runtime : null,
  ].filter(Boolean);

  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      <section className="relative flex min-h-[78vh] items-end overflow-hidden sm:min-h-[84vh]">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={backdrop}
          alt=""
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#050505]/95 via-[#050505]/60 to-[#050505]/15" />
        <div className="absolute inset-0 bg-linear-to-t from-[#070707] via-[#070707]/10 to-black/35" />

        <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent px-5 py-5 sm:px-10 lg:px-16">
          <img
            className="w-28 drop-shadow-lg sm:w-36"
            src={NETFLIX_LOGO}
            alt="Netflix"
          />
          <Link
            to="/browse"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md transition hover:bg-white/10">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4">
              <path d="m15 18-6-6 6-6M9 12h12" />
            </svg>
            Back to browse
          </Link>
        </header>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-10 sm:pb-24 lg:px-16">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e50914]/35 bg-[#e50914]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-red-200">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e50914]" />
            Featured film
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,.7)] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {tagline && (
            <p className="mt-4 max-w-2xl text-base font-medium text-white/75 sm:text-lg">
              {tagline}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
            {metadata.map((item, index) => (
              <span
                className={index === 0 ? "font-bold text-emerald-300" : ""}
                key={item}>
                {index > 0 && (
                  <span aria-hidden="true" className="mr-3 text-white/35">
                    •
                  </span>
                )}
                {item}
              </span>
            ))}
          </div>

          {genres.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-medium text-white/75 backdrop-blur-sm">
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black shadow-lg transition hover:bg-white/85 active:scale-[0.98] sm:text-base">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
              </svg>
              Play
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.98] sm:text-base">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5">
                <path d="M12 3v18M3 12h18" />
              </svg>
              My List
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 grid max-w-7xl gap-6 px-5 pb-16 sm:px-10 lg:-mt-10 lg:grid-cols-[1.4fr_.8fr] lg:gap-8 lg:px-16">
        <article className="rounded-2xl border border-white/10 bg-[#111]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-300">
            The story
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
            About this film
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            {overview}
          </p>
        </article>

        <aside className="grid gap-5 rounded-2xl border border-white/10 bg-[#111]/90 p-6 shadow-2xl backdrop-blur-md sm:grid-cols-[auto_1fr] sm:items-center sm:p-8 lg:grid-cols-1">
          {poster ? (
            <img
              className="mx-auto aspect-[2/3] w-32 rounded-xl object-cover shadow-xl sm:w-36 lg:w-full lg:max-w-[15rem]"
              src={poster}
              alt={`${title} poster`}
              loading="lazy"
            />
          ) : (
            <div className="mx-auto flex aspect-[2/3] w-32 items-center justify-center rounded-xl bg-linear-to-br from-zinc-800 via-zinc-900 to-black p-4 text-center text-lg font-bold text-white/80 shadow-xl sm:w-36 lg:w-full lg:max-w-[15rem]">
              {title}
            </div>
          )}
          <div className="min-w-0">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/45">
              Movie details
            </p>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-white/45">Release year</dt>
                <dd className="mt-1 font-semibold text-white/90">
                  {releaseYear}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Rating</dt>
                <dd className="mt-1 font-semibold text-white/90">{rating}</dd>
              </div>
              <div>
                <dt className="text-white/45">Genres</dt>
                <dd className="mt-1 font-semibold text-white/90">
                  {genres.length ? genres.join(" · ") : "—"}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default MovieDetails;
