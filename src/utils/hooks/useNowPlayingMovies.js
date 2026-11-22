import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../slices/movieSlice";
import { API_NOW_PLAYING_MOVIE, API_OPTIONS } from "../constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(API_NOW_PLAYING_MOVIE, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData.results));
  };

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, []);
};

export default useNowPlayingMovies;
