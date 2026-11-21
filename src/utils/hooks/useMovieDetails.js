import { useEffect, useState } from "react";
import { API_MOVIE_DETAILS, API_OPTIONS } from "../constants";

const useMovieDetails = (id) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadMovieDetails = async () => {
      if (!id) {
        setMovie(null);
        setError("A movie ID is required.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");
      setMovie(null);

      try {
        const response = await fetch(
          `${API_MOVIE_DETAILS}${encodeURIComponent(id)}`,
          { ...API_OPTIONS, signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(
            `Movie details request failed with status ${response.status}.`,
          );
        }

        const movieData = await response.json();
        if (movieData.success === false) {
          throw new Error(
            movieData.status_message ?? "The movie details request failed.",
          );
        }

        setMovie(movieData);
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Failed to load movie details:", requestError);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load movie details.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadMovieDetails();
    return () => controller.abort();
  }, [id]);

  return { movie, isLoading, error };
};

export default useMovieDetails;
