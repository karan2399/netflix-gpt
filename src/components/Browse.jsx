import { useSelector } from "react-redux";
import Header from "./Header";
import useNowPlayingMovies from "../utils/hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#252525_0%,#090909_38%,#050505_100%)] text-white">
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </main>
  );
};

export default Browse;
