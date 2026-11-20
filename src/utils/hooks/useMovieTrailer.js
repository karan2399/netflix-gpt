import { useDispatch, useSelector } from "react-redux";
import { API_MOVIE_VIDEOS, API_OPTIONS } from "../constants";
import { addTrailer } from "../slices/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (id) => {
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const data = await fetch(API_MOVIE_VIDEOS + id + "/videos", API_OPTIONS);
    const jsonData = await data.json();
    const filteredTrailers = jsonData.results.filter(
      (video) => video.type === "Trailer",
    );
    const trailer = filteredTrailers.length
      ? filteredTrailers[0]
      : jsonData.results[0];
    dispatch(addTrailer(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
