import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { BG_IMAGE } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const dispatch = useDispatch();
  const name = useRef(null);

  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    setErrMessage(null);
    // Validate the form data
    let errMessage;
    errMessage = checkValidData(email.current.value, password.current.value);
    setErrMessage(errMessage);

    if (errMessage) {
      return;
    }

    if (!isSignInForm) {
      //  Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              // An error occurred
              setErrMessage(error.message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#050505] font-sans text-white">
      <Header />
      <div className="absolute inset-0">
        <img
          className="h-full w-full scale-[1.02] object-cover"
          src={BG_IMAGE}
          alt="Background-Image"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.78)_0%,rgba(0,0,0,.28)_45%,rgba(0,0,0,.9)_100%)]" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 sm:py-32">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-[450px] rounded-lg border border-white/[0.08] bg-black/75 p-6 shadow-[0_30px_80px_rgba(0,0,0,.65)] backdrop-blur-md sm:p-12">
          <h1 className="pb-7 text-3xl font-bold tracking-tight sm:text-[32px]">
            {" "}
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              className="mb-4 w-full rounded-md border border-white/20 bg-[#333]/75 px-4 py-4 text-base text-white outline-none transition-colors duration-200 placeholder:text-gray-300 hover:border-white/30 focus:border-white focus:bg-[#454545]"
            />
          )}

          <input
            ref={email}
            type="text"
            inputMode="email"
            autoComplete="email"
            placeholder="Email"
            className="mb-4 w-full rounded-md border border-white/20 bg-[#333]/75 px-4 py-4 text-base text-white outline-none transition-colors duration-200 placeholder:text-gray-300 hover:border-white/30 focus:border-white focus:bg-[#454545]"
          />
          <input
            ref={password}
            type="password"
            autoComplete={isSignInForm ? "current-password" : "new-password"}
            placeholder="Password"
            className="mb-4 w-full rounded-md border border-white/20 bg-[#333]/75 px-4 py-4 text-base text-white outline-none transition-colors duration-200 placeholder:text-gray-300 hover:border-white/30 focus:border-white focus:bg-[#454545]"
          />

          <p className="min-h-7 py-1 text-sm font-medium text-[#e87c03]">
            {errMessage}
          </p>
          <button
            type="submit"
            className="mt-3 w-full cursor-pointer rounded-md bg-[#e50914] px-4 py-3.5 text-base font-semibold shadow-lg transition duration-200 hover:bg-[#f6121d] active:scale-[0.99]"
            onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="cursor-pointer pt-7 text-sm text-gray-300 transition-colors hover:text-white"
            onClick={toggleSignInForm}>
            {!isSignInForm
              ? "Already a User? Sign In"
              : "New to Netflix? Sign Up Now"}
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
