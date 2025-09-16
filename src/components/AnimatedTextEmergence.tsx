import { useState, useEffect } from "react";

interface AnimatedTextEmergenceProps {
  text: string;
  className?: string;
  startDelay?: number;
  charDelay?: number;
}

export const AnimatedTextEmergence = ({ 
  text, 
  className = "", 
  startDelay = 0, 
  charDelay = 100 
}: AnimatedTextEmergenceProps) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!showText) return;

    if (visibleChars < text.length) {
      const timer = setTimeout(() => {
        setVisibleChars(prev => prev + 1);
      }, charDelay);

      return () => clearTimeout(timer);
    }
  }, [visibleChars, text.length, showText, charDelay]);

  const renderCharacters = () => {
    return text.split('').map((char, index) => {
      const isVisible = index < visibleChars;
      const delay = index * charDelay;
      
      return (
        <span
          key={index}
          className={`inline-block ${isVisible ? 'animate-char-emerge' : 'opacity-0'}`}
          style={{
            animationDelay: `${delay}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className={className}>
      {renderCharacters()}
    </div>
  );
};