// Touch gesture utilities for mobile interactions
export const useTouchGestures = () => {
  const minSwipeDistance = 50;

  const onTouchStart = (e, setTouchStart) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e, setTouchEnd) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (touchStart, touchEnd, onSwipeLeft, onSwipeRight) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

// Drag and drop utilities for timetable
export const useDragAndDrop = () => {
  const onDragStart = (e, data) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, onDropCallback) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    if (onDropCallback) {
      onDropCallback(data);
    }
  };

  return { onDragStart, onDragOver, onDrop };
};
