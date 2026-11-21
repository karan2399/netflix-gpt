import { useDispatch, useSelector } from "react-redux";
import { toggleGptSearchView } from "../utils/slices/gptSlice";
import { changeLanguage } from "../utils/slices/appSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import lang from "../utils/languageConstants";

const GPTSearchBar = () => {
  const dispatch = useDispatch();

  const language = useSelector((store) => store.app.language);

  return (
    <div>
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#111]/95 p-5 shadow-[0_30px_100px_rgba(0,0,0,.7)] sm:p-8 lg:p-10">
        <button
          type="button"
          aria-label={lang[language].closeGptSearch}
          className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
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
            Netflix GPT
          </p>
          <label className="relative flex items-center rounded-full border border-white/10 bg-white/5 pl-2">
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
        <h1 className="max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          {lang[language].gptSearchPlaceholder}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          {lang[language].gptSearchDescription}
        </p>

        <form
          className="mt-7 flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 sm:flex-row sm:items-center"
          onSubmit={(event) => event.preventDefault()}>
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
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35 sm:text-base"
              type="text"
              placeholder={lang[language].searchInputPlaceholder}
              aria-label={lang[language].searchInputLabel}
            />
          </div>
          <button
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e50914] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#f6121d] sm:px-6"
            type="submit">
            {lang[language].search}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default GPTSearchBar;
