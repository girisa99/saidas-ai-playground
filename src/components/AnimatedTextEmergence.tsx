import { useState, useEffect } from "react";

interface AnimatedTextEmergenceProps {
  text: string;
  className?: string;
  startDelay?: number;
  charDelay?: number;
  bottlePosition?: { x: number; y: number };
  flyFromBottle?: boolean;
}

export const AnimatedTextEmergence = ({ 
  text, 
  className = "", 
  startDelay = 0, 
  charDelay = 150,
  bottlePosition = { x: 50, y: 50 },
  flyFromBottle = false
}: AnimatedTextEmergenceProps) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;

    if (visibleChars < text.length) {
      const timer = setTimeout(() => {
        setVisibleChars(prev => prev + 1);
      }, charDelay);

      return () => clearTimeout(timer);
    }
  }, [visibleChars, text.length, isStarted, charDelay]);

  const renderCharacters = () => {
    return text.split('').map((char, index) => {
      const isVisible = index < visibleChars;
      const delay = `${index * 50}ms`;
      
      // Calculate starting position if flying from bottle
      const startX = flyFromBottle ? `${bottlePosition.x - 50}vw` : '0px';
      const startY = flyFromBottle ? `${bottlePosition.y - 50}vh` : '-12px';
      
      return (
        <span
          key={index}
          className={`inline-block transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 transform translate-x-0 translate-y-0 scale-100' 
              : `opacity-0 transform scale-50`
          }`}
          style={{
            transitionDelay: delay,
            filter: isVisible ? 'blur(0px)' : 'blur(5px)',
            transform: !isVisible && flyFromBottle 
              ? `translateX(${startX}) translateY(${startY}) scale(0.5)` 
              : undefined,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className={`relative inline-block whitespace-nowrap ${className}`}>
      {renderCharacters()}
    </div>
  );
};