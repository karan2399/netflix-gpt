import Header from "./Header";
import useNowPlayingMovies from "../utils/hooks/useNowPlayingMovies";
import usePopularMovies from "../utils/hooks/usePopularMovies";

import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import Footer from "./Footer";
import useTopRatedMovies from "../utils/hooks/useTopRated";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#252525_0%,#090909_38%,#050505_100%)]">
        <Header />
        <MainContainer />
        <SecondaryContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
