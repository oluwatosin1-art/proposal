import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Proposal from './components/Proposal';
import Celebration from './components/Celebration';
import LoveMeter from './components/LoveMeter';
import SecretLetter from './components/SecretLetter';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api';

function App() {
  const [response, setResponse] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoveMeter, setShowLoveMeter] = useState(false);
  const [showSecretLetter, setShowSecretLetter] = useState(false);
  const [loveQuote, setLoveQuote] = useState('');

  // Check if already answered
  useEffect(() => {
    checkStatus();
    fetchLoveQuote();
  }, []);

  // Show love meter and secret letter after response
  useEffect(() => {
    if (response === 'YES' && responseData) {
      setTimeout(() => setShowLoveMeter(true), 1000);
      setTimeout(() => setShowSecretLetter(true), 2000);
    }
    if (response === 'NO' && responseData) {
      setTimeout(() => setShowLoveMeter(true), 2000);
      setTimeout(() => setShowSecretLetter(true), 3000);
    }
  }, [response, responseData]);

  const checkStatus = async () => {
    try {
      const res = await axios.get(`${API_URL}/status`);
      if (res.data.status === 'answered') {
        setResponse(res.data.answer);
        setResponseData({
          poem: res.data.poem,
          compliment: res.data.compliment,
          loveMeter: res.data.loveMeter,
          timestamp: res.data.timestamp,
          responseEmoji: res.data.responseEmoji
        });
      }
    } catch (err) {
      console.error('Error checking status:', err);
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (answer) => {
    try {
      const res = await axios.post(`${API_URL}/respond`, { answer });
      if (res.data.success) {
        setResponse(answer);
        setResponseData({
          poem: res.data.poem,
          compliment: res.data.compliment,
          loveMeter: res.data.loveMeter,
          timestamp: res.data.timestamp,
          responseEmoji: res.data.responseEmoji
        });

        if (res.data.sound) {
          const audio = new Audio(res.data.sound);
          audio.play().catch(e => console.log('Audio play failed:', e));
        }
      }
    } catch (err) {
      console.error('Error submitting response:', err);
      setError('Error submitting response. Please try again.');
    }
  };

  const fetchLoveQuote = async () => {
    try {
      const res = await axios.get(`${API_URL}/love-quote`);
      setLoveQuote(res.data.quote);
    } catch (err) {
      console.log('Could not fetch love quote');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>💖 Loading something special...</p>
      </div>
    );
  }

  // If answered YES
  if (response === 'YES' && responseData) {
    return (
      <div className="App">
        {error && (
          <div className="error-message">
            ⚠️ {error}
            <button onClick={checkStatus}>Retry</button>
          </div>
        )}

        <Celebration />

        <div className="response-container">
          <div className="response-card yes">
            <div className="heart-icon">💖</div>
            <h2>YAY! 🎉</h2>
            <p className="response-text">
              You made me the happiest person ever!
            </p>

            {responseData.compliment && (
              <div className="compliment-bubble">
                <span>💫</span>
                <p>{responseData.compliment}</p>
              </div>
            )}

            {showLoveMeter && responseData.loveMeter && (
              <LoveMeter score={responseData.loveMeter} isYes={true} />
            )}

            {showSecretLetter && responseData.poem && (
              <SecretLetter
                response="YES"
                poem={responseData.poem}
                compliment={responseData.compliment}
              />
            )}

            <div className="response-detail">
              <span className="emoji">💕</span>
              <span>I can't wait to start this beautiful journey with you</span>
              <span className="emoji">💕</span>
            </div>

            <div className="love-message">
              <p>❤️ I promise to make every ordinary day feel special for you too ❤️</p>
            </div>

            {loveQuote && (
              <div className="love-quote">
                <span>📝</span>
                <p>"{loveQuote}"</p>
              </div>
            )}

            <div className="response-timestamp">
              🕰️ You said YES at {new Date(responseData.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If answered NO
  if (response === 'NO' && responseData) {
    return (
      <div className="App">
        {error && (
          <div className="error-message">
            ⚠️ {error}
            <button onClick={checkStatus}>Retry</button>
          </div>
        )}

        <div className="response-container">
          <div className="response-card no">
            <div className="heart-icon">💔</div>
            <h2>Oh... okay 😢</h2>
            <p className="response-text">
              I'll always care about you
            </p>

            {responseData.compliment && (
              <div className="compliment-bubble no">
                <span>💫</span>
                <p>{responseData.compliment}</p>
              </div>
            )}

            {showLoveMeter && responseData.loveMeter && (
              <LoveMeter score={responseData.loveMeter} isYes={false} />
            )}

            {showSecretLetter && responseData.poem && (
              <SecretLetter
                response="NO"
                poem={responseData.poem}
                compliment={responseData.compliment}
              />
            )}

            <div className="response-detail">
              <span>🤗</span>
              <span>Take care of yourself</span>
              <span>💫</span>
            </div>

            {loveQuote && (
              <div className="love-quote">
                <span>📝</span>
                <p>"{loveQuote}"</p>
              </div>
            )}

            <div className="response-timestamp">
              🕰️ You responded at {new Date(responseData.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No response yet - Show the proposal
  return (
    <div className="App">
      {error && (
        <div className="error-message">
          ⚠️ {error}
          <button onClick={checkStatus}>Retry</button>
        </div>
      )}

      {loveQuote && (
        <div className="floating-quote">
          💭 {loveQuote}
        </div>
      )}

      <Proposal
        onRespond={handleResponse}
        currentResponse={response}
      />
    </div>
  );
}

export default App;