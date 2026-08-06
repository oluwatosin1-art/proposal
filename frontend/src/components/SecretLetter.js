import React, { useState } from 'react';
import './SecretLetter.css';

const SecretLetter = ({ response, poem, compliment }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const secretPassword = response === 'YES' ? 'iloveyou' : 'foreverfriends';
    const secretHint = response === 'YES'
        ? '💕 What do I feel for you? (3 words, no spaces)'
        : '🤝 What will we always be? (2 words, no spaces)';

    const handleUnlock = () => {
        if (password.toLowerCase() === secretPassword) {
            setIsUnlocked(true);
            setError('');
        } else {
            setError('💔 Wrong password... Try again with your heart 💔');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (!isUnlocked) {
        return (
            <div className="secret-letter-container">
                <div className="secret-lock">
                    <span className="lock-emoji">🔒</span>
                    <h3>💌 A Secret Love Letter</h3>
                    <p className="secret-hint">{secretHint}</p>
                    <div className="password-input">
                        <input
                            type="password"
                            placeholder="Enter the secret word..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                        />
                        <button onClick={handleUnlock}>🔓 Unlock</button>
                    </div>
                    {error && <p className="secret-error">{error}</p>}
                    <p className="secret-note">💫 Hint: It's what's in my heart for you</p>
                </div>
            </div>
        );
    }

    return (
        <div className="secret-letter-container unlocked">
            <div className="secret-letter">
                <div className="letter-header">
                    <span className="letter-emoji">💌</span>
                    <h2>A Love Letter Just for You</h2>
                </div>

                <div className="letter-content">
                    <div className="letter-poem">
                        <pre className="poem-text">{poem}</pre>
                    </div>

                    <div className="letter-compliment">
                        <span className="compliment-icon">🌟</span>
                        <p>{compliment}</p>
                    </div>

                    {response === 'YES' && (
                        <div className="letter-promise">
                            <h4>💖 My Promise to You:</h4>
                            <ul>
                                <li>✨ I'll always make you smile</li>
                                <li>❤️ I'll be your biggest supporter</li>
                                <li>🌹 I'll cherish every moment with you</li>
                                <li>💕 I'll love you more each day</li>
                            </ul>
                        </div>
                    )}

                    {response === 'NO' && (
                        <div className="letter-friendship">
                            <h4>🤗 My Promise to You:</h4>
                            <ul>
                                <li>✨ I'll always be there for you</li>
                                <li>❤️ I'll cherish our friendship</li>
                                <li>🌹 I'll respect your feelings</li>
                                <li>💫 You'll always be special to me</li>
                            </ul>
                        </div>
                    )}

                    <div className="letter-signature">
                        <p>Forever yours,</p>
                        <p className="signature-name">[Gabriel] ❤️</p>
                        <p className="signature-date">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="letter-seal">
                    <span>💖 Sealed with love</span>
                </div>
            </div>
        </div>
    );
};

export default SecretLetter;