import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearchView } from "../utils/slices/gptSlice";
import { changeLanguage } from "../utils/slices/appSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import geminiai from "../utils/geminiai";

const AISearchBar = () => {
  const dispatch = useDispatch();

  const language = useSelector((store) => store.app.language);

  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchText.current?.value.trim();

    if (!query) {
      setErrorMessage(lang[language].emptySearchError);
      setRecommendations("");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setRecommendations("");

    try {
      const interaction = await geminiai.interactions.create({
        model: "gemini-4-hydrogen",
        input: [
          "Act as a movie recommendation system.",
          `Recommend five movies for this request: ${query}`,
          "Return only five movie titles, separated by commas.",
        ].join("\n"),
      });
      const output = interaction.output_text?.trim();

      if (!output) {
        throw new Error(lang[language].emptyResponseError);
      }

      setRecommendations(output);
    } catch (error) {
      console.error("Gemini movie search failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : lang[language].searchRequestError,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#1a1a1a]/95 via-[#111]/95 to-[#080808]/95 p-5 shadow-[0_30px_100px_rgba(0,0,0,.7)] sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#e50914]/80 to-transparent"
        />
        <button
          type="button"
          aria-label={lang[language].closeGptSearch}
          className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition duration-200 hover:rotate-90 hover:bg-white/10 hover:text-white"
          onClick={() => dispatch(toggleGptSearchView())}>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pr-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e50914]/30 bg-[#e50914]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e50914]" />
            Netflix AI
          </p>
          <label className="relative flex items-center rounded-full border border-white/10 bg-white/5 pl-2 transition-colors focus-within:border-white/25">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-4 w-4 shrink-0 text-white/65">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
            </svg>
            <select
              className="w-18 cursor-pointer appearance-none bg-transparent py-2 pl-1.5 pr-5 text-xs font-medium text-white outline-none"
              aria-label={lang[language].chooseLanguage}
              value={language}
              onChange={(event) =>
                dispatch(changeLanguage(event.target.value))
              }>
              {SUPPORTED_LANGUAGES.map((item) => (
                <option
                  key={item.identifier}
                  className="bg-[#111] text-white"
                  value={item.identifier}>
                  {item.name}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute right-1 h-3 w-3 text-white/55">
              <path d="m7 10 5 5 5-5" />
            </svg>
          </label>
        </div>
        <h1 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {lang[language].gptSearchPlaceholder}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          {lang[language].gptSearchDescription}
        </p>

        <form
          onSubmit={handleSearch}
          aria-busy={isLoading}
          className="mt-7 flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 transition focus-within:border-white/25 focus-within:ring-4 focus-within:ring-white/5 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 shrink-0 text-white/45">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              ref={searchText}
              className="ai-search-input min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35 disabled:cursor-wait sm:text-base"
              type="text"
              placeholder={lang[language].searchInputPlaceholder}
              aria-label={lang[language].searchInputLabel}
              disabled={isLoading}
            />
          </div>
          <button
            className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e50914] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition duration-200 hover:scale-[1.02] hover:bg-[#f6121d] active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100 sm:px-6"
            type="submit"
            disabled={isLoading}>
            {isLoading ? lang[language].searching : lang[language].search}
            {isLoading ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 animate-spin">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-90"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </button>
        </form>
        {errorMessage && (
          <p
            className="mt-4 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200"
            role="alert">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 h-4 w-4 shrink-0">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5M12 16.5v.1" />
            </svg>
            {errorMessage}
          </p>
        )}
        {recommendations && (
          <div
            className="mt-6 rounded-2xl border border-white/10 bg-linear-to-br from-white/[0.07] to-white/[0.02] p-5 shadow-inner"
            aria-live="polite">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4 text-red-300">
                <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z" />
              </svg>
              {lang[language].recommendationsTitle}
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-white/75">
              {recommendations}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISearchBar;
