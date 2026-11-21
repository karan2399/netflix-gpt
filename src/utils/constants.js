export const NETFLIX_LOGO =
  "https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAf58AA8Z6nusXt5B-ppRug_vXEqLa657gFe5CBe4jVeSA_CxcsmYrZxZZxXSgwU5KA0aGs7lVPrdcDefw_XxI6W0EFno5krXI88dYw3BUM6HEZRO_N4ZTMzoYhMd-g4S3fo8XIxOME4.svg";
export const BG_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/cafd79d7-3d44-4558-8d0a-fc447fc3899f/web/CA-en-20261116-TRIFECTA-perspective_0cf385b4-2f5b-4a39-a797-c8c40d5cc383_medium.jpg";
export const USER_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMPU5gJUj46ufL6FQfX3XvM7lR7qtcMy63tuj2siLuUQ&s=10";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_API_KEY,
  },
};

export const API_POPULAR_MOVIES = "https://api.themoviedb.org/3/movie/popular";

export const API_NOW_PLAYING_MOVIE =
  "https://api.themoviedb.org/3/movie/now_playing?page=1";
export const API_MOVIE_VIDEOS = "https://api.themoviedb.org/3/movie/";

export const API_TOP_RATED_MOVIES =
  "https://api.themoviedb.org/3/movie/top_rated";

export const API_MOVIE_DETAILS = "https://api.themoviedb.org/3/movie/";

export const POSTER_PATH = "https://image.tmdb.org/t/p/w500/";
export const BACKDROP_PATH = "https://image.tmdb.org/t/p/w780/";

export const SUPPORTED_LANGUAGES = [
  {
    identifier: "en",
    name: "English",
  },
  {
    identifier: "hindi",
    name: "हिन्दी",
  },
  {
    identifier: "spanish",
    name: "Español",
  },
];

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
