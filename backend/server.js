const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// Romantic response system
const proposalState = {
    response: null,
    timestamp: null,
    ipAddress: null,
    loveMeter: null
};

// Romantic poems based on response
const POEMS = {
    YES: [
        "Roses are red, violets are blue,\nMy heart beats faster, because of you.\nYou said YES to this journey we'll start,\nForever together, you've captured my heart. 💖",
        "In a world of stars, you shine so bright,\nYour YES has filled my world with light.\nTogether we'll laugh, together we'll grow,\nThis beautiful love, we'll always know. ✨",
        "Like a flower blooming in the spring,\nYour YES makes my heart sing.\nWith every moment, every day,\nI'll love you in every way. 🌹"
    ],
    NO: [
        "The stars still shine, the moon still glows,\nThough you said no, my love still grows.\nI'll cherish you from far or near,\nAnd always hold your memory dear. 💫",
        "Sometimes dreams don't go our way,\nBut I'm grateful for today.\nYour friendship means more than you know,\nI'll always care wherever you go. 🌙"
    ]
};

const COMPLIMENTS = {
    YES: [
        "You're the most beautiful soul I've ever met ✨",
        "Your smile lights up my entire world ☀️",
        "Every day with you is a blessing 🌈",
        "You make ordinary days feel like poetry 📝"
    ],
    NO: [
        "You're still amazing and wonderful 🌟",
        "Your kindness means the world to me 💫",
        "I'll always appreciate you 🌸",
        "You're a beautiful person inside and out 💝"
    ]
};

const SOUNDS = {
    YES: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
    NO: "https://www.soundjay.com/misc/sounds/water-drop-01.mp3"
};

// 🏠 ROOT ROUTE - This fixes the "Cannot GET /" error
app.get('/', (req, res) => {
    res.json({
        name: '💖 Romantic Proposal API',
        status: 'online',
        message: 'Welcome to the proposal backend!',
        endpoints: {
            status: '/api/status - Check proposal status',
            respond: '/api/respond - Submit response (POST)',
            reset: '/api/reset - Reset proposal (POST)',
            loveQuote: '/api/love-quote - Get random love quote'
        },
        documentation: 'https://github.com/oluwatosin1-art/proposal'
    });
});

// Get status with romantic elements
app.get('/api/status', (req, res) => {
    if (proposalState.response === null) {
        return res.json({
            status: 'pending',
            message: 'Waiting for your answer... 💕',
            romanticTip: 'The stars are aligned for something magical ✨'
        });
    }

    const isYes = proposalState.response === 'YES';
    const poems = POEMS[proposalState.response];
    const compliments = COMPLIMENTS[proposalState.response];

    res.json({
        status: 'answered',
        answer: proposalState.response,
        timestamp: proposalState.timestamp,
        poem: poems[Math.floor(Math.random() * poems.length)],
        compliment: compliments[Math.floor(Math.random() * compliments.length)],
        loveMeter: isYes ? Math.floor(Math.random() * 30 + 70) : Math.floor(Math.random() * 30 + 10),
        sound: SOUNDS[proposalState.response],
        responseEmoji: isYes ? '💖' : '💔'
    });
});

// Submit response with love tracking
app.post('/api/respond', (req, res) => {
    const { answer } = req.body;

    if (!answer || (answer !== 'YES' && answer !== 'NO')) {
        return res.status(400).json({ error: 'Invalid response' });
    }

    proposalState.response = answer;
    proposalState.timestamp = new Date().toISOString();
    proposalState.ipAddress = req.ip || req.connection.remoteAddress;
    proposalState.loveMeter = answer === 'YES' ? Math.floor(Math.random() * 30 + 70) : Math.floor(Math.random() * 30 + 10);

    const poems = POEMS[answer];
    const compliments = COMPLIMENTS[answer];

    res.json({
        success: true,
        answer: answer,
        timestamp: proposalState.timestamp,
        poem: poems[Math.floor(Math.random() * poems.length)],
        compliment: compliments[Math.floor(Math.random() * compliments.length)],
        loveMeter: proposalState.loveMeter,
        sound: SOUNDS[answer],
        responseEmoji: answer === 'YES' ? '💖' : '💔'
    });
});

// Reset endpoint
app.post('/api/reset', (req, res) => {
    proposalState.response = null;
    proposalState.timestamp = null;
    proposalState.ipAddress = null;
    proposalState.loveMeter = null;
    
    res.json({ 
        success: true, 
        message: '🔄 Reset successful! Ready for the real answer.',
        status: 'pending'
    });
});

// Get a random love quote
app.get('/api/love-quote', (req, res) => {
    const quotes = [
        "Love is not about how many days, months, or years you've been together. It's about how much you love each other every single day.",
        "The best thing to hold onto in life is each other.",
        "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
        "Love is composed of a single soul inhabiting two bodies.",
        "Where there is love there is life.",
        "The only thing we never get enough of is love.",
        "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope."
    ];

    res.json({
        quote: quotes[Math.floor(Math.random() * quotes.length)]
    });
});

// For Vercel - export the app
module.exports = app;

// For local development
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`💖 Love Server running on http://localhost:${PORT}`);
        console.log(`🌹 Ready for the most romantic moment!`);
        console.log(`📊 Check status: http://localhost:${PORT}/api/status`);
    });
}