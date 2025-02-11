const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Log email options
    console.log('Attempting to send email with options:', {
        to: options.email,
        subject: options.subject
    });

    // Log SMTP config to debug
    console.log('SMTP Configuration:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
        }
    });

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',  
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true, 
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD 
            }
        });

        const message = {
            from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        const info = await transporter.sendMail(message);
        console.log('Email sent successfully:', info);
    } catch (error) {
        console.error('Error sending email:', error);
        // Throw error 
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = { sendEmail };