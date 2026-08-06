// backend/notification.js - Optional email/SMS notifications
const nodemailer = require('nodemailer');

// Email notification (using Gmail - free)
const sendEmailNotification = async (response, poem) => {
  // Configure your email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'boluwatosin72@gmail.com',
      pass: 'iygx plbq jwrs qdfp' // Use App Password, not regular password
    }
  });

  const isYes = response === 'YES';
  
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com', // Send to yourself
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
    await transporter.sendMail(mailOptions);
    console.log('📧 Notification email sent!');
  } catch (error) {
    console.error('Email error:', error);
  }
};

// SMS notification (using Twilio - free trial)
const sendSMSNotification = async (response) => {
  // You'll need Twilio account for this
  // https://www.twilio.com/
  const twilio = require('twilio');
  
  const accountSid = 'your-twilio-sid';
  const authToken = 'your-twilio-token';
  const client = twilio(accountSid, authToken);
  
  const isYes = response === 'YES';
  
  try {
    await client.messages.create({
      body: isYes 
        ? '💖 SHE SAID YES! Congratulations! 🎉 She wants to be your girlfriend!' 
        : '💔 She said no. Stay strong, brother 💪',
      to: '+1234567890', // Your phone number
      from: '+1234567890' // Your Twilio number
    });
    console.log('📱 SMS notification sent!');
  } catch (error) {
    console.error('SMS error:', error);
  }
};

module.exports = { sendEmailNotification, sendSMSNotification };