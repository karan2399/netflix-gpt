import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-10 flex min-h-screen items-end px-5 pb-36 sm:px-10 sm:pb-40 md:px-16 lg:px-20">
      <div className="max-w-xl md:max-w-2xl">
        <h1 className="mb-3 max-w-[90%] text-3xl font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,.85)] sm:text-4xl md:max-w-full md:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="mb-5 max-w-lg text-sm leading-relaxed text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,.9)] sm:text-base md:max-w-xl md:text-lg">
          {overview}
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-black shadow-lg transition duration-200 hover:bg-white/80 active:scale-[0.98] sm:px-7 sm:py-3 sm:text-base">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
            </svg>
            Play
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-[#6d6d6d]/75 px-5 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-sm transition duration-200 hover:bg-[#6d6d6d]/55 active:scale-[0.98] sm:px-7 sm:py-3 sm:text-base">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v6M12 7.5v.1" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
