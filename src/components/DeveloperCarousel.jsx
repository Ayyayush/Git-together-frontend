// DeveloperCarousel.jsx
import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FeedCard from "./FeedCard";

const DeveloperCarousel = ({ developers, isRecommendation, onActionSuccess }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("opacity-100 translate-x-0");

  const minSwipeDistance = 50;

  useEffect(() => {
    setCurrentIndex(0);
  }, [developers.length, isRecommendation]);

  const triggerTransition = useCallback((nextIndex, direction) => {
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
        setAnimationClass("opacity-100 translate-x-0 transition-all duration-150 ease-in-out");
        setAnimating(false);
      }, 50);
    }, 150);
  }, [animating]);

  const handleNext = useCallback(() => {
    if (currentIndex < developers.length - 1) {
      triggerTransition(currentIndex + 1, "next");
    }
  }, [currentIndex, developers.length, triggerTransition]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      triggerTransition(currentIndex - 1, "prev");
    }
  }, [currentIndex, triggerTransition]);

  const handleActionSuccess = useCallback((userId) => {
    if (onActionSuccess) {
      onActionSuccess(userId);
    }
  }, [onActionSuccess]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!developers || developers.length === 0) return null;

  const currentDev = developers[currentIndex];

  return (
    <div className="w-full flex flex-col items-center relative px-2">
      <div className="w-full flex items-center justify-center my-4 min-h-[640px]">
        {/* Card and Navigation Relative Wrapper Container */}
        <div className="relative inline-flex items-center justify-center">
          
          {/* Left Control Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute -left-6 sm:-left-8 z-30 flex items-center justify-center w-14 h-14 rounded-full border border-indigo-500/30 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.7),_0_0_2px_rgba(99,102,241,0.2)] transition-all duration-250 ease-in-out hover:scale-110 hover:border-cyan-400 hover:bg-slate-900/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] active:scale-95 disabled:opacity-15 disabled:pointer-events-none group"
            aria-label="Previous Developer"
          >
            <FaChevronLeft className="text-white group-hover:text-cyan-300 transition-colors duration-250" size={24} />
          </button>

          {/* Dynamic Card Segment */}
          <div 
            className={`z-20 transform ${animationClass}`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <FeedCard 
              info={currentDev} 
              isRecommendation={isRecommendation} 
              onActionSuccess={handleActionSuccess} 
            />
          </div>

          {/* Right Control Arrow */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === developers.length - 1}
            className="absolute -right-6 sm:-right-8 z-30 flex items-center justify-center w-14 h-14 rounded-full border border-indigo-500/30 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.7),_0_0_2px_rgba(99,102,241,0.2)] transition-all duration-250 ease-in-out hover:scale-110 hover:border-cyan-400 hover:bg-slate-900/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] active:scale-95 disabled:opacity-15 disabled:pointer-events-none group"
            aria-label="Next Developer"
          >
            <FaChevronRight className="text-white group-hover:text-cyan-300 transition-colors duration-250" size={24} />
          </button>

        </div>
      </div>

      {/* Optimized Unified Premium Pagination Controls */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <div className="flex items-center gap-2 max-w-[240px] overflow-x-auto py-1.5 px-3 bg-black/30 border border-white/5 rounded-full scrollbar-none">
          {developers.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ease-out shrink-0 ${
                idx === currentIndex ? "w-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]" : "w-2 bg-gray-600"
              }`}
            />
          ))}
        </div>
        
        <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest bg-slate-950/80 px-4 py-1.5 rounded-full border border-white/5 shadow-md">
          Developer <span className="text-cyan-400 font-extrabold">{currentIndex + 1}</span> of <span className="text-gray-300">{developers.length}</span>
        </p>
      </div>
    </div>
  );
};

export default DeveloperCarousel;