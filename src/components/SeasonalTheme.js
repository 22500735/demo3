import React, { useState, useEffect } from 'react';
import './SeasonalTheme.css';

const SeasonalTheme = ({ children }) => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [seasonalElements, setSeasonalElements] = useState([]);

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    let season = 'spring';
    
    if (month >= 3 && month <= 5) season = 'spring';
    else if (month >= 6 && month <= 8) season = 'summer';
    else if (month >= 9 && month <= 11) season = 'autumn';
    else season = 'winter';
    
    setCurrentSeason(season);

    // Generate seasonal floating elements
    const elements = [];
    for (let i = 0; i < 8; i++) {
      elements.push({
        id: i,
        emoji: getSeasonalEmoji(season),
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4
      });
    }
    setSeasonalElements(elements);
  }, []);

  const getSeasonalEmoji = (season) => {
    const emojis = {
      spring: ['🌸', '🌺', '🦋', '🌿', '🌱'],
      summer: ['☀️', '🌻', '🍉', '🏖️', '🌊'],
      autumn: ['🍂', '🍁', '🌰', '🍄', '🎃'],
      winter: ['❄️', '⛄', '🎄', '🎅', '🔔']
    };
    const seasonEmojis = emojis[season] || emojis.spring;
    return seasonEmojis[Math.floor(Math.random() * seasonEmojis.length)];
  };

  return (
    <div className={`seasonal-theme ${currentSeason}`}>
      <div className="seasonal-background">
        {seasonalElements.map(element => (
          <div
            key={element.id}
            className="floating-element"
            style={{
              left: `${element.left}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default SeasonalTheme;
