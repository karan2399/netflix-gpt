import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { log } from "firebase/firestore/pipelines";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <header className="absolute z-20 flex w-full items-center justify-between bg-gradient-to-b from-black/95 via-black/40 to-transparent px-5 py-3 sm:px-10 sm:py-4">
      <img
        className="w-28 cursor-pointer drop-shadow-[0_4px_14px_rgba(0,0,0,.9)] transition-transform duration-200 hover:scale-105 sm:w-36"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAf58AA8Z6nusXt5B-ppRug_vXEqLa657gFe5CBe4jVeSA_CxcsmYrZxZZxXSgwU5KA0aGs7lVPrdcDefw_XxI6W0EFno5krXI88dYw3BUM6HEZRO_N4ZTMzoYhMd-g4S3fo8XIxOME4.svg"
        alt="Netflix Logo"
      />
      {user && (
        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-black/30 p-1.5 pr-2 shadow-lg backdrop-blur-md sm:gap-3 sm:px-2 sm:py-1.5">
          <p className="max-w-20 truncate text-sm font-medium text-white/90 sm:max-w-32">
            {user.displayName}
          </p>
          <img
            className="h-8 w-8 rounded-full border border-white/20 object-cover shadow-md sm:h-9 sm:w-9"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMPU5gJUj46ufL6FQfX3XvM7lR7qtcMy63tuj2siLuUQ&s=10"
            alt="User Icon"
          />
          <button
            className="cursor-pointer rounded-full px-2.5 py-1.5 text-xs font-semibold text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white sm:px-3 sm:text-sm"
            onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
