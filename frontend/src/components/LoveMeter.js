import React, { useState, useEffect } from 'react';
import './LoveMeter.css';

const LoveMeter = ({ score, isYes }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Animate the love meter
    let current = 0;
    const interval = setInterval(() => {
      if (current < score) {
        current += Math.ceil((score - current) / 10);
        setDisplayScore(Math.min(current, score));
      } else {
        clearInterval(interval);
        if (isYes) {
          setShowHearts(true);
          setTimeout(() => setShowHearts(false), 3000);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [score, isYes]);

  const getEmoji = () => {
    if (!isYes) return '💔';
    if (score >= 90) return '💖';
    if (score >= 70) return '❤️';
    if (score >= 50) return '💕';
    return '💗';
  };

  const getLabel = () => {
    if (!isYes) return 'Heartache Level';
    if (score >= 90) return 'Soulmate Level ❤️';
    if (score >= 70) return 'Deep Love 💖';
    if (score >= 50) return 'Falling Hard 💕';
    return 'Growing Love 🌱';
  };

  return (
    <div className="love-meter-container">
      <div className="love-meter-header">
        <span className="love-meter-emoji">{getEmoji()}</span>
        <h3>{getLabel()}</h3>
      </div>
      
      <div className="love-meter-track">
        <div 
          className="love-meter-fill"
          style={{ 
            width: `${displayScore}%`,
            background: isYes 
              ? 'linear-gradient(90deg, #f093fb, #f5576c, #ff6b6b)'
              : 'linear-gradient(90deg, #a0aec0, #718096)'
          }}
        >
          <span className="love-meter-percentage">{displayScore}%</span>
        </div>
      </div>
      
      {showHearts && (
        <div className="love-meter-hearts">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="floating-heart-mini" style={{
              animationDelay: `${i * 0.2}s`,
              left: `${Math.random() * 100}%`
            }}>
              💖
            </span>
          ))}
        </div>
      )}
      
      <div className="love-meter-footer">
        {isYes ? (
          <span>✨ Your love is off the charts! ✨</span>
        ) : (
          <span>💫 Sometimes love takes time to grow 💫</span>
        )}
      </div>
    </div>
  );
};

export default LoveMeter;