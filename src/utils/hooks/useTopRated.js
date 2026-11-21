import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../slices/movieSlice";
import { API_OPTIONS, API_TOP_RATED_MOVIES } from "../constants";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    const data = await fetch(API_TOP_RATED_MOVIES, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addTopRatedMovies(jsonData.results));
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
