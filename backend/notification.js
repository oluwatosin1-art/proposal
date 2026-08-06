// backend/notification.js - Email/SMS notifications
const nodemailer = require('nodemailer');

// Email notification (using Gmail - free)
const sendEmailNotification = async (response, poem) => {
  // Configure your email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'boluwatosin72@gmail.com',
      pass: 'iygx plbq jwrs qdfp' // Your App Password
    }
  });

  const isYes = response === 'YES';
  
  // ✅ FIX: Use the correct email addresses
  const mailOptions = {
    from: 'boluwatosin72@gmail.com', // Your email
    to: 'boluwatosin72@gmail.com', // Send to yourself (change if needed)
    subject: isYes ? '💖 SHE SAID YES! 🎉' : '💔 She said no...',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 20px;">
        <div style="background: white; padding: 30px; border-radius: 15px;">
          <h1 style="text-align: center; color: #2d3748;">
            ${isYes ? '💖 SHE SAID YES! 💖' : '💔 She said no...'}
          </h1>
          <p style="text-align: center; font-size: 18px; color: #4a5568;">
            ${isYes ? '🎉 Congratulations! She said YES to being your girlfriend!' : 'It\'s okay. Sometimes things don\'t go as planned.'}
          </p>
          <div style="background: #f7fafc; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="font-style: italic; color: #2d3748; text-align: center;">
              "${poem}"
            </p>
          </div>
          <div style="text-align: center; color: #718096; font-size: 14px;">
            <p>Response recorded at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Notification email sent!', info.messageId);
    console.log('📧 Sent to:', 'boluwatosin72@gmail.com');
  } catch (error) {
    console.error('❌ Email error:', error.message);
    if (error.code === 'EAUTH') {
      console.error('⚠️ Authentication failed! Check your email and app password.');
      console.error('💡 Make sure you have:');
      console.error('  1. Enabled 2-Factor Authentication on your Google account');
      console.error('  2. Generated an App Password (not your regular password)');
      console.error('  3. The App Password has no spaces');
    }
  }
};

// SMS notification (optional)
const sendSMSNotification = async (response) => {
  // You'll need Twilio account for this
  // https://www.twilio.com/
  // Skip for now if you don't have Twilio
  console.log('📱 SMS notification not configured yet');
  return;
};

module.exports = { sendEmailNotification, sendSMSNotification };