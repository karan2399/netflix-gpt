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
    <div>
      <VideoBackground id={id} poster={poster_path} />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
