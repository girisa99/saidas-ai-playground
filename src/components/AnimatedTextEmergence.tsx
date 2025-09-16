import { useState, useEffect, useRef } from "react";

interface AnimatedTextEmergenceProps {
  text: string;
  className?: string;
  startDelay?: number;
  charDelay?: number;
  bottlePosition?: { x: number; y: number };
  flyFromBottle?: boolean;
  onComplete?: () => void;
  fitToContainer?: boolean;
  allowWrap?: boolean;
}

export const AnimatedTextEmergence = ({ 
  text, 
  className = "", 
  startDelay = 0, 
  charDelay = 150,
  bottlePosition = { x: 50, y: 50 },
  flyFromBottle = false,
  onComplete,
  fitToContainer = false,
  allowWrap = true,
}: AnimatedTextEmergenceProps) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);
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

  useEffect(() => {
    if (!onComplete) return;
    if (isStarted && visibleChars >= text.length) {
      onComplete();
    }
  }, [visibleChars, text.length, isStarted, onComplete]);

  useEffect(() => {
    if (!fitToContainer) return;
    const recalc = () => {
      const container = containerRef.current;
      const content = contentRef.current;
      if (!container || !content) return;
      const containerWidth = container.clientWidth;
      const contentWidth = content.scrollWidth;
      const nextScale = contentWidth > 0 ? Math.min(1, containerWidth / contentWidth) : 1;
      setScale(nextScale);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [fitToContainer, text, visibleChars]);

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
    <div ref={containerRef} className={`relative block w-full overflow-visible ${className}`}>
      <span ref={contentRef} className={`inline-block ${allowWrap ? 'whitespace-normal break-words' : 'whitespace-nowrap'}`} style={{ transform: fitToContainer ? `scale(${scale})` : undefined, transformOrigin: 'left center' }}>
        {renderCharacters()}
      </span>
    </div>
  );
};