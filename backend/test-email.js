const nodemailer = require('nodemailer');

async function testEmail() {
  try {
    // Use your actual app password (no spaces!)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'boluwatosin72@gmail.com',
        pass: 'iygxplbqjwrsqdfp' // REPLACE WITH YOUR ACTUAL APP PASSWORD
      }
    });

    const mailOptions = {
      from: 'boluwatosin72@gmail.com',
      to: 'boluwatosin72@gmail.com',
      subject: '🧪 Test Email from Proposal App',
      html: `
        <h1>✅ Email is working!</h1>
        <p>This is a test email from your proposal app.</p>
        <p>Sent at: ${new Date().toLocaleString()}</p>
        <p>💖 Your app is ready for her response!</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 To:', 'boluwatosin72@gmail.com');
  } catch (error) {
    console.error('❌ Email error:', error.message);
    if (error.code === 'EAUTH') {
      console.error('⚠️ Authentication failed!');
      console.error('💡 Check your App Password:');
      console.error('   1. Go to https://myaccount.google.com/apppasswords');
      console.error('   2. Generate a NEW password');
      console.error('   3. Use it without spaces');
      console.error('   4. Make sure 2-Factor Authentication is ON');
    }
  }
}

testEmail();