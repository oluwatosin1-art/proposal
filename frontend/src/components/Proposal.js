import React, { useState } from 'react';
import './Proposal.css';

const Proposal = ({ onRespond, currentResponse }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);

  const handleClick = async (answer) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await onRespond(answer);
    setIsSubmitting(false);
  };

  if (currentResponse) {
    return null;
  }

  return (
    <div className="proposal-container">
      <div className="proposal-card">
        <div className="heart-icon pulse">💖</div>
        
        <h1>A Letter for You</h1>
        
        <div className="message-preview">
          <p className="message-text">
            {showFullMessage ? (
              <>
                I've been thinking about this for a while and I don't want to keep it in my head anymore. 
                I like you. I like how you make me laugh, how you make ordinary days feel special, 
                and how I feel calm when I'm with you.
                <br /><br />
                I'm not asking for perfect. I'm asking for us. To try, to laugh, to grow together.
                <br /><br />
                So... will you be my girlfriend? No pressure. Just my heart, on paper.
                <br /><br />
                <span className="signature">Yours, [Your Name] ❤️</span>
              </>
            ) : (
              <>
                <span className="preview-text">
                  I've been thinking about this for a while... 
                  <span className="read-more" onClick={() => setShowFullMessage(true)}>
                    {' '}read more
                  </span>
                </span>
              </>
            )}
          </p>
          
          {!showFullMessage && (
            <button 
              className="read-more-btn"
              onClick={() => setShowFullMessage(true)}
            >
              📖 Read Full Letter
            </button>
          )}
          
          {showFullMessage && (
            <button 
              className="read-more-btn"
              onClick={() => setShowFullMessage(false)}
            >
              🙈 Show Less
            </button>
          )}
        </div>
        
        <div className="divider">✦ ✦ ✦</div>
        
        <div className="question-text">
          💕 So... will you be my girlfriend? 💕
        </div>
        
        <div className="button-group">
          <button 
            className="btn btn-yes"
            onClick={() => handleClick('YES')}
            disabled={isSubmitting}
          >
            <span className="btn-icon">💖</span>
            YES
          </button>
          <button 
            className="btn btn-no"
            onClick={() => handleClick('NO')}
            disabled={isSubmitting}
          >
            <span className="btn-icon">💔</span>
            NO
          </button>
        </div>
        
        {isSubmitting && (
          <div className="submitting">
            <span className="loader-small"></span>
            Sending your answer...
          </div>
        )}
        
        <div className="footer-text">
          <span>✨ No pressure. Just my heart, on paper. ✨</span>
        </div>
      </div>
    </div>
  );
};

export default Proposal;