import Login from "./Login";
import Browse from "./Browse";
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Link,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import MovieDetails from "./MovieDetails";

const ErrorPage = ({ notFound = false }) => (
  <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-white">
    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111]/90 p-8 text-center shadow-2xl sm:p-12">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-300">
        {notFound ? "404 · Page not found" : "Something went wrong"}
      </p>
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
        {notFound ? "This title is off the map." : "We hit a playback error."}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
        {notFound
          ? "The page may have moved, or the address may be incorrect."
          : "Please return to browse and try again."}
      </p>
      <Link
        className="mt-8 inline-flex rounded-lg bg-[#e50914] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#f6121d]"
        to="/browse">
        Return to browse
      </Link>
    </div>
  </main>
);

const RouteError = () => {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return <ErrorPage notFound={notFound} />;
};

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <RouteError />,
    },
    {
      path: "/browse",
      element: <Browse />,
      errorElement: <RouteError />,
    },
    {
      path: "/details/:id",
      element: <MovieDetails />,
      errorElement: <RouteError />,
    },
    {
      path: "*",
      element: <ErrorPage notFound />,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#050505]">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
