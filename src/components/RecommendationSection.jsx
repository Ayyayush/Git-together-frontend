// RecommendationSection.jsx
import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FeedCard from "./FeedCard";

const RecommendationSection = ({ recommendations, onActionSuccess }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("opacity-100 translate-x-0");

  const minSwipeDistance = 50;

  useEffect(() => {
    setCurrentIndex(0);
  }, [recommendations?.length]);

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
    if (recommendations && currentIndex < recommendations.length - 1) {
      triggerTransition(currentIndex + 1, "next");
    }
  }, [currentIndex, recommendations, triggerTransition]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      triggerTransition(currentIndex - 1, "prev");
    }
  }, [currentIndex, triggerTransition]);

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

  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return null;
  }

  const currentDev = recommendations[currentIndex];

  return (
    <div className="w-full flex flex-col gap-6 items-center relative">
      <div className="w-full flex flex-col bg-gradient-to-r from-indigo-950/40 to-cyan-950/40 border border-indigo-500/20 backdrop-blur-md p-4 rounded-xl shadow-lg">
        <h2 className="text-base font-black text-indigo-400 tracking-wide font-mono uppercase">
          People You May Know
        </h2>
        <p className="text-[11px] text-gray-400 mt-0.5">
          Developers recommended based on your profile.
        </p>
      </div>

      <div className="w-full flex items-center justify-center relative my-4 min-h-[640px] px-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-2 sm:-left-12 lg:-left-16 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none group"
          aria-label="Previous Recommendation"
        >
          <FaChevronLeft className="text-gray-300 group-hover:text-white transition-colors" size={16} />
        </button>

        <div 
          className={`z-20 transform ${animationClass}`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <FeedCard 
            info={currentDev} 
            isRecommendation={true} 
            onActionSuccess={onActionSuccess}
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === recommendations.length - 1}
          className="absolute right-2 sm:-right-12 lg:-right-16 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none group"
          aria-label="Next Recommendation"
        >
          <FaChevronRight className="text-gray-300 group-hover:text-white transition-colors" size={16} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 mt-2">
        <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/5">
          Developer <span className="text-indigo-400">{currentIndex + 1}</span> / {recommendations.length}
        </p>
        
        <div className="flex items-center gap-1.5 max-w-[240px] overflow-x-auto py-1 scrollbar-none">
          {recommendations.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 shrink-0 ${
                idx === currentIndex ? "w-5 bg-gradient-to-r from-indigo-500 to-cyan-500" : "w-1.5 bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;