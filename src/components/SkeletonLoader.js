import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'post', count = 3 }) => {
  const renderPostSkeleton = () => (
    <div className="skeleton-post">
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-user-info">
          <div className="skeleton-line skeleton-name"></div>
          <div className="skeleton-line skeleton-time"></div>
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-text short"></div>
      </div>
      <div className="skeleton-image"></div>
      <div className="skeleton-actions">
        <div className="skeleton-action-btn"></div>
        <div className="skeleton-action-btn"></div>
        <div className="skeleton-action-btn"></div>
        <div className="skeleton-action-btn"></div>
      </div>
    </div>
  );

  const renderBoardSkeleton = () => (
    <div className="skeleton-board">
      <div className="skeleton-board-icon"></div>
      <div className="skeleton-board-info">
        <div className="skeleton-line skeleton-board-title"></div>
        <div className="skeleton-line skeleton-board-desc"></div>
      </div>
    </div>
  );

  const renderCardSkeleton = () => (
    <div className="skeleton-card">
      <div className="skeleton-card-header">
        <div className="skeleton-line skeleton-card-title"></div>
        <div className="skeleton-line skeleton-card-subtitle"></div>
      </div>
      <div className="skeleton-card-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="skeleton-list-item">
      <div className="skeleton-list-icon"></div>
      <div className="skeleton-list-content">
        <div className="skeleton-line skeleton-list-title"></div>
        <div className="skeleton-line skeleton-list-subtitle"></div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'post':
        return renderPostSkeleton();
      case 'board':
        return renderBoardSkeleton();
      case 'card':
        return renderCardSkeleton();
      case 'list':
        return renderListSkeleton();
      default:
        return renderPostSkeleton();
    }
  };

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
