import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleGptSearchView } from "../utils/slices/gptSlice";
import AISearchBar from "./AISearchBar";

const AISearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  return (
    <section className="fixed inset-0 z-30 flex min-h-screen items-start justify-center overflow-y-auto bg-black/75 px-3 py-12 backdrop-blur-md sm:items-center sm:px-4 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,9,20,.18),transparent_55%)]"
      />
      <AISearchBar />
    </section>
  );
};

export default AISearch;
