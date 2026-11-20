import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../slices/movieSlice";
import { API_OPTIONS, API_POPULAR_MOVIES } from "../constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(API_POPULAR_MOVIES, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
