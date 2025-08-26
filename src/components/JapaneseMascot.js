import React, { useState, useEffect } from 'react';
import './JapaneseMascot.css';

const JapaneseMascot = ({ mood = 'happy', size = 'medium', position = 'floating' }) => {
  const [currentMascot, setCurrentMascot] = useState('🐱');
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState('');

  const mascots = {
    happy: ['🐱', '🐰', '🐸', '🦊', '🐼'],
    excited: ['🎉', '✨', '🌟', '💫', '🎊'],
    studying: ['📚', '✏️', '🤓', '💡', '📖'],
    eating: ['🍱', '🍜', '🍙', '🥢', '🍵'],
    sleeping: ['😴', '💤', '🌙', '⭐', '🛌']
  };

  const messages = {
    happy: ['がんばって！', 'いいね！', 'すごい！', 'やったね！'],
    excited: ['わーい！', 'やったー！', 'すばらしい！', '最高！'],
    studying: ['勉強頑張って！', 'ファイト！', '集中！', '応援してる！'],
    eating: ['いただきます！', 'おいしそう！', 'ごちそうさま！', 'お疲れさま！'],
    sleeping: ['おやすみ！', 'ゆっくり休んで', 'いい夢を！', 'また明日！']
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      const moodMascots = mascots[mood] || mascots.happy;
      const randomMascot = moodMascots[Math.floor(Math.random() * moodMascots.length)];
      setCurrentMascot(randomMascot);
      
      const moodMessages = messages[mood] || messages.happy;
      const randomMessage = moodMessages[Math.floor(Math.random() * moodMessages.length)];
      setMessage(randomMessage);
      
      setTimeout(() => setIsAnimating(false), 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [mood]);

  const handleClick = () => {
    setIsAnimating(true);
    const moodMascots = mascots[mood] || mascots.happy;
    const randomMascot = moodMascots[Math.floor(Math.random() * moodMascots.length)];
    setCurrentMascot(randomMascot);
    
    const moodMessages = messages[mood] || messages.happy;
    const randomMessage = moodMessages[Math.floor(Math.random() * moodMessages.length)];
    setMessage(randomMessage);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className={`japanese-mascot ${position} ${size} ${isAnimating ? 'animating' : ''}`}>
      <div className="mascot-character" onClick={handleClick}>
        {currentMascot}
      </div>
      {message && (
        <div className="mascot-message">
          <div className="message-bubble">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default JapaneseMascot;
