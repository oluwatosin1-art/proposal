// backend/notification.js - Optional email/SMS notifications
const nodemailer = require('nodemailer');

// Email notification (using Gmail - free)
const sendEmailNotification = async (response, poem) => {
  try {
    console.log(`📧 Attempting to send email for response: ${response}`);
    
    // Check if email config exists
    if (!process.env.EMAIL_USER && !process.env.EMAIL_PASS) {
      console.log('⚠️ Email not configured, skipping...');
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'boluwatosin72@gmail.com',
        pass: process.env.EMAIL_PASS || 'iygxplbqjwrsqdfp'
      }
    });

    const isYes = response === 'YES';
    
    const mailOptions = {
      from: 'boluwatosin72@gmail.com',
      to: 'boluwatosin72@gmail.com',
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

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent! Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email error:', error.message);
    // Don't throw - just return false so the app doesn't crash
    return false;
  }
};

// SMS notification (optional)
const sendSMSNotification = async (response) => {
  console.log('📱 SMS notification not configured yet');
  return false;
};

module.exports = { sendEmailNotification, sendSMSNotification };