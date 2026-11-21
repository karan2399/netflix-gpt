import { useSelector } from "react-redux";
import useMovieTrailer from "../utils/hooks/useMovieTrailer";
import { POSTER_PATH } from "../utils/constants";

const VideoBackground = ({ id, poster }) => {
  const movieTrailer = useSelector((store) => store.movies?.trailer);
  useMovieTrailer(id);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#080808]">
      {poster && (
        <img
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center"
          src={POSTER_PATH + poster}
          alt=""
          aria-hidden="true"
        />
      )}
      {movieTrailer?.key && (
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          src={`https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1&mute=1`}
          title="Featured movie trailer"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.88)_0%,rgba(0,0,0,.4)_38%,rgba(0,0,0,.08)_70%,rgba(0,0,0,.2)_100%),linear-gradient(to_top,#050505_0%,rgba(5,5,5,.68)_14%,transparent_48%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
    </div>
  );
};

export default VideoBackground;
