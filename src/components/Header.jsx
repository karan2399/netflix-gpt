import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/slices/userSlice";
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex w-full items-center justify-between bg-gradient-to-b from-black/95 via-black/40 to-transparent px-5 py-3 sm:px-10 sm:py-4">
      <img
        className="w-28 cursor-pointer drop-shadow-[0_4px_14px_rgba(0,0,0,.9)] transition-transform duration-200 hover:scale-105 sm:w-36"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"
      />
      {user && (
        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-black/30 p-1.5 pr-2 shadow-lg backdrop-blur-md sm:gap-3 sm:px-2 sm:py-1.5">
          <p className="max-w-20 truncate text-sm font-medium text-white/90 sm:max-w-32">
            {user.displayName}
          </p>
          <img
            className="h-8 w-8 rounded-full border border-white/20 object-cover shadow-md sm:h-9 sm:w-9"
            src={USER_AVATAR}
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
