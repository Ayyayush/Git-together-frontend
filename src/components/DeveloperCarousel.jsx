// DeveloperCarousel.jsx

import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FeedCard from "./FeedCard";

const DeveloperCarousel = ({
  developers,
  isRecommendation,
  onActionSuccess,
  onActionFailure,
  hideArrows = false,
  onNearEnd,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState(
    "opacity-100 translate-x-0"
  );

  const minSwipeDistance = 50;

  // Reset index ONLY when switching between Recommended and Global Feed.
  useEffect(() => {
    setCurrentIndex(0);
  }, [isRecommendation]);

  // Keep current index valid if developers are removed.
  useEffect(() => {
    if (
      developers &&
      developers.length > 0 &&
      currentIndex >= developers.length
    ) {
      setCurrentIndex(developers.length - 1);
    }
  }, [developers, currentIndex]);

  /*
   * =====================================================
   * GLOBAL FEED PRE-FETCH
   * =====================================================
   *
   * Example:
   *
   * 10 developers currently loaded
   *
   * User reaches developer 8
   *          ↓
   * onNearEnd()
   *          ↓
   * Feed.jsx requests page 2
   *          ↓
   * developers 11-20 are appended
   *
   * This happens BEFORE the user reaches developer 10,
   * so navigation can continue without stopping.
   *
   * This is intentionally disabled for Recommended because
   * recommendation pagination is separate.
   */
  useEffect(() => {
    if (
      isRecommendation ||
      typeof onNearEnd !== "function" ||
      !developers ||
      developers.length === 0
    ) {
      return;
    }

    // Fetch next page when there are only 2 cards remaining.
    const prefetchThreshold = 2;

    const remainingCards =
      developers.length - 1 - currentIndex;

    if (remainingCards <= prefetchThreshold) {
      onNearEnd();
    }
  }, [
    currentIndex,
    developers,
    isRecommendation,
    onNearEnd,
  ]);

  /*
   * =====================================================
   * CARD TRANSITION
   * =====================================================
   */
  const triggerTransition = useCallback(
    (nextIndex, direction) => {
      if (animating) return;

      setAnimating(true);

      setAnimationClass(
        direction === "next"
          ? "opacity-0 -translate-x-12 transition-all duration-150 ease-in-out"
          : "opacity-0 translate-x-12 transition-all duration-150 ease-in-out"
      );

      setTimeout(() => {
        setCurrentIndex(nextIndex);

        setAnimationClass(
          direction === "next"
            ? "opacity-0 translate-x-12"
            : "opacity-0 -translate-x-12"
        );

        setTimeout(() => {
          setAnimationClass(
            "opacity-100 translate-x-0 transition-all duration-150 ease-in-out"
          );

          setAnimating(false);
        }, 50);
      }, 150);
    },
    [animating]
  );

  /*
   * =====================================================
   * NEXT DEVELOPER
   * =====================================================
   */
  const handleNext = useCallback(() => {
    if (!developers || developers.length === 0) {
      return;
    }

    if (currentIndex < developers.length - 1) {
      triggerTransition(
        currentIndex + 1,
        "next"
      );
    }
  }, [
    currentIndex,
    developers,
    triggerTransition,
  ]);

  /*
   * =====================================================
   * PREVIOUS DEVELOPER
   * =====================================================
   */
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      triggerTransition(
        currentIndex - 1,
        "prev"
      );
    }
  }, [
    currentIndex,
    triggerTransition,
  ]);

  /*
   * =====================================================
   * CARD ACTION SUCCESS
   * =====================================================
   *
   * When a developer is removed after an action
   * (Interested / Ignore etc.), keep carousel index valid.
   */
  const handleActionSuccess = useCallback(
    (userId) => {
      if (
        developers.length > 1 &&
        currentIndex === developers.length - 1
      ) {
        setCurrentIndex((prev) =>
          Math.max(0, prev - 1)
        );
      }

      if (onActionSuccess) {
        onActionSuccess(userId);
      }
    },
    [
      onActionSuccess,
      currentIndex,
      developers.length,
    ]
  );

  /*
   * =====================================================
   * KEYBOARD NAVIGATION
   * =====================================================
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [handleNext, handlePrev]);

  /*
   * =====================================================
   * MOBILE SWIPE
   * =====================================================
   */
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(
      e.targetTouches[0].clientX
    );
  };

  const onTouchMove = (e) => {
    setTouchEnd(
      e.targetTouches[0].clientX
    );
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance =
      touchStart - touchEnd;

    const isLeftSwipe =
      distance > minSwipeDistance;

    const isRightSwipe =
      distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  /*
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */
  if (
    !developers ||
    developers.length === 0
  ) {
    return null;
  }

  // Boundary-safe current index
  const safeIndex =
    currentIndex >= developers.length
      ? Math.max(
          0,
          developers.length - 1
        )
      : currentIndex;

  const currentDev =
    developers[safeIndex];

  if (!currentDev) {
    return null;
  }
    /*
   * =====================================================
   * RENDER
   * =====================================================
   */
  return (
    <div className="w-full flex flex-col items-center relative px-2">
      <div className="w-full flex items-center justify-center my-4 min-h-[640px]">

        {/* Card and Navigation Relative Wrapper Container */}
        <div className="relative inline-flex items-center justify-center">

          {/* Left Control Arrow */}
          {!hideArrows && (
            <button
              type="button"
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className="absolute -left-6 sm:-left-8 z-30 flex items-center justify-center w-14 h-14 rounded-full border border-indigo-500/30 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.7),_0_0_2px_rgba(99,102,241,0.2)] transition-all duration-250 ease-in-out hover:scale-110 hover:border-cyan-400 hover:bg-slate-900/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] active:scale-95 disabled:opacity-15 disabled:pointer-events-none group"
              aria-label="Previous Developer"
            >
              <FaChevronLeft
                className="text-white group-hover:text-cyan-300 transition-colors duration-250"
                size={24}
              />
            </button>
          )}

          {/* Dynamic Developer Card */}
          <div
            className={`z-20 transform ${animationClass}`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <FeedCard
              key={currentDev._id}
              info={currentDev}
              isRecommendation={isRecommendation}
              onActionSuccess={handleActionSuccess}
              onActionFailure={onActionFailure}
            />
          </div>

          {/* Right Control Arrow */}
          {!hideArrows && (
            <button
              type="button"
              onClick={handleNext}
              disabled={safeIndex === developers.length - 1}
              className="absolute -right-6 sm:-right-8 z-30 flex items-center justify-center w-14 h-14 rounded-full border border-indigo-500/30 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.7),_0_0_2px_rgba(99,102,241,0.2)] transition-all duration-250 ease-in-out hover:scale-110 hover:border-cyan-400 hover:bg-slate-900/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] active:scale-95 disabled:opacity-15 disabled:pointer-events-none group"
              aria-label="Next Developer"
            >
              <FaChevronRight
                className="text-white group-hover:text-cyan-300 transition-colors duration-250"
                size={24}
              />
            </button>
          )}

        </div>
      </div>

      {/* Pagination / Position Indicator */}
      <div className="flex flex-col items-center gap-3 mt-4">

        {/* Developer Position Dots */}
        <div className="flex items-center gap-2 max-w-[240px] overflow-x-auto py-1.5 px-3 bg-black/30 border border-white/5 rounded-full scrollbar-none">
          {developers.map((developer, idx) => (
            <span
              key={developer?._id || idx}
              className={`h-2 rounded-full transition-all duration-300 ease-out shrink-0 ${
                idx === safeIndex
                  ? "w-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                  : "w-2 bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Current Developer Counter */}
        <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest bg-slate-950/80 px-4 py-1.5 rounded-full border border-white/5 shadow-md">
          Developer{" "}
          <span className="text-cyan-400 font-extrabold">
            {safeIndex + 1}
          </span>{" "}
          of{" "}
          <span className="text-gray-300">
            {developers.length}
          </span>
        </p>

      </div>
    </div>
  );
};

export default DeveloperCarousel;