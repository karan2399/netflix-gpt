import { useNavigate } from "react-router-dom";
import { BACKDROP_PATH, POSTER_PATH } from "../utils/constants";

const MovieCard = ({ mData }) => {
  const navigate = useNavigate();
  const title = mData?.title ?? mData?.original_title ?? "Untitled movie";
  const artwork = mData?.backdrop_path
    ? BACKDROP_PATH + mData.backdrop_path
    : mData?.poster_path
      ? POSTER_PATH + mData.poster_path
      : null;
  const handleCardClick = () => {
    navigate("/details/" + mData.id);
  };
  return (
    <article
      onClick={handleCardClick}
      className="group relative w-[min(82vw,18rem)] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-xl transition duration-300 hover:z-10 hover:scale-[1.03] hover:border-white/25 sm:w-80 lg:w-96">
      {artwork ? (
        <img
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={artwork}
          alt={`${title} artwork`}
          loading="lazy"
        />
      ) : (
        <div
          className="flex aspect-video items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-950 p-4 text-center text-sm font-semibold text-white/70"
          role="img"
          aria-label={`${title} artwork unavailable`}>
          {title}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/75 to-transparent px-4 pb-4 pt-14">
        <h2 className="line-clamp-2 text-base font-bold leading-snug text-white sm:text-lg">
          {title}
        </h2>
        <div className="mt-2 flex items-center gap-2 text-xs font-medium text-white/75">
          {mData?.release_date && <span>{mData.release_date.slice(0, 4)}</span>}
          {typeof mData?.vote_average === "number" && (
            <>
              {mData?.release_date && (
                <span className="h-1 w-1 rounded-full bg-white/50" />
              )}
              <span>{mData.vote_average.toFixed(1)} / 10</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
