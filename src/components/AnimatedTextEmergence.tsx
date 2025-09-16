import { useState, useEffect } from "react";

interface AnimatedTextEmergenceProps {
  text: string;
  className?: string;
  startDelay?: number;
  charDelay?: number;
  bottlePosition?: { x: number; y: number };
}

export const AnimatedTextEmergence = ({ 
  text, 
  className = "", 
  startDelay = 0, 
  charDelay = 150,
  bottlePosition = { x: 50, y: 50 }
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
      
      return (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform -translate-y-12 scale-50'
          }`}
          style={{
            transitionDelay: delay,
            filter: isVisible ? 'blur(0px)' : 'blur(5px)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className={`relative ${className}`}>
      {renderCharacters()}
    </div>
  );
};