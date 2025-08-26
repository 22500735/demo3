import React, { useState } from 'react';
import { useTouchGestures } from '../utils/touchGestures';
import './SwipeableContainer.css';

const SwipeableContainer = ({ children, onSwipeLeft, onSwipeRight, className = '' }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures();

  const handleTouchStart = (e) => {
    onTouchStart(e, setTouchStart);
  };

  const handleTouchMove = (e) => {
    onTouchMove(e, setTouchEnd);
  };

  const handleTouchEnd = () => {
    onTouchEnd(touchStart, touchEnd, onSwipeLeft, onSwipeRight);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className={`swipeable-container ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default SwipeableContainer;
