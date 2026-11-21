import { useDispatch } from "react-redux";
import { addPopularMovies } from "../slices/movieSlice";
import { API_OPTIONS, API_POPULAR_MOVIES } from "../constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getPopulrMovies = async () => {
    const data = await fetch(API_POPULAR_MOVIES, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addPopularMovies(jsonData.results));
  };

  useEffect(() => {
    getPopulrMovies();
  }, []);
};

export default useNowPlayingMovies;
