import Login from "./Login";
import Browse from "./Browse";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#050505]">
      <RouterProvider router={appRouter}>
        <Login />
        <Browse />
      </RouterProvider>
    </div>
  );
};

export default Body;
