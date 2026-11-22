import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) {
    return;
  }
  const mainMovie = movies[Math.floor(Math.random() * movies.length)];

  const { id, original_title, overview, poster_path } = mainMovie;
  return (
    <div className="relative h-[86svh] min-h-[28rem] sm:h-screen sm:min-h-[40rem]">
      <VideoBackground id={id} poster={poster_path} />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
