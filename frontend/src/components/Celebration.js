import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import './Celebration.css';

const Celebration = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [showHearts, setShowHearts] = useState(true);
  const [showText, setShowText] = useState(true);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Generate hearts continuously
    const heartInterval = setInterval(() => {
      setHeartCount(prev => prev + 1);
    }, 500);
    
    // Hide everything after 15 seconds
    const timer = setTimeout(() => {
      setShowHearts(false);
      setShowText(false);
    }, 15000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(heartInterval);
      clearTimeout(timer);
    };
  }, []);

  const loveEmojis = ['❤️', '💖', '💕', '💗', '💓', '❣️', '💝', '💘', '💞', '💟'];
  const celebrationEmojis = ['🎉', '🎊', '✨', '🌟', '⭐', '💫', '🎆', '🎇'];

  return (
    <div className="celebration-container">
      {/* Confetti - Multiple colors */}
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={350}
        recycle={false}
        colors={[
          '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bb5', 
          '#a66cff', '#ff4757', '#ff6348', '#ffa502', '#2ed573',
          '#1e90ff', '#ff6b81', '#eccc68', '#7bed9f', '#70a1ff'
        ]}
        gravity={0.15}
        initialVelocityY={{ min: 5, max: 15 }}
      />

      {/* Second confetti layer - Hearts */}
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={100}
        recycle={false}
        drawShape={(ctx) => {
          ctx.font = '30px sans-serif';
          ctx.fillText('❤️', 0, 30);
        }}
        gravity={0.1}
        initialVelocityY={{ min: 2, max: 10 }}
      />

      {/* Floating Hearts - Continuous */}
      {showHearts && (
        <div className="floating-hearts">
          {Array.from({ length: 80 }).map((_, index) => {
            const style = {
              left: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 5 + 3) + 's',
              animationDelay: (Math.random() * 8) + 's',
              fontSize: (Math.random() * 40 + 20) + 'px',
              opacity: Math.random() * 0.8 + 0.2,
              transform: `rotate(${Math.random() * 360}deg)`
            };
            
            const isHeart = Math.random() > 0.3;
            const emojiList = isHeart ? loveEmojis : celebrationEmojis;
            
            return (
              <div 
                key={index}
                className="floating-heart"
                style={style}
              >
                {emojiList[Math.floor(Math.random() * emojiList.length)]}
              </div>
            );
          })}
        </div>
      )}

      {/* Dynamic hearts that appear randomly */}
      {showHearts && Array.from({ length: heartCount % 20 }).map((_, index) => (
        <div 
          key={`dynamic-${index}`}
          className="dynamic-heart"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            fontSize: (Math.random() * 30 + 15) + 'px',
            animation: `popHeart ${Math.random() * 0.5 + 0.5}s ease-out forwards`,
            animationDelay: `${Math.random() * 0.3}s`
          }}
        >
          💖
        </div>
      ))}

      {/* Celebration Overlay with text animation */}
      {showText && (
        <div className="celebration-overlay">
          <div className="celebration-text">
            <div className="celebrate-emoji-container">
              <span className="big-emoji bounce">💖</span>
              <span className="big-emoji bounce-delayed">🎉</span>
              <span className="big-emoji bounce-more">✨</span>
            </div>
            
            <h2 className="glow-text">She Said YES! 🎉</h2>
            
            <p className="sub-text slide-in">
              You make ordinary days feel special 💕
            </p>
            
            <div className="celebration-subtext fade-in">
              <span className="sparkle">✨</span>
              <span>This is just the beginning of something beautiful</span>
              <span className="sparkle">✨</span>
            </div>
            
            <div className="celebration-buttons">
              <div className="heart-rain">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="rain-heart" style={{
                    animationDelay: `${i * 0.3}s`
                  }}>💕</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating "YES" text */}
      {showText && (
        <div className="floating-yes">
          {Array.from({ length: 8 }).map((_, i) => (
            <span 
              key={i}
              className="yes-text"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                fontSize: (Math.random() * 30 + 20) + 'px',
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            >
              YES 💖
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Celebration;