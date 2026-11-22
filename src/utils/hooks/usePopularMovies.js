import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../slices/movieSlice";
import { API_OPTIONS, API_POPULAR_MOVIES } from "../constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(API_POPULAR_MOVIES, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addPopularMovies(jsonData.results));
  };

  useEffect(() => {
    if (!popularMovies) {
      getPopularMovies();
    }
  }, []);
};

export default useNowPlayingMovies;
