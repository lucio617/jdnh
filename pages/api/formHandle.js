import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, mail, number, message } = req.body;

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jdnh321@gmail.com',  // Your email
        pass: 'myhospital',         // Your Gmail app password
      },
    });

    const details = `Name: ${name}\nEmail: ${mail}\nPhone: ${number}\nMessage: ${message}`;

    const mailOptions = {
      from: 'jdnh321@gmail.com',
      to: 'culcruzader@gmail.com',  // Recipient's email
      subject: 'New Contact Form Submission',
      text: details,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    // Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
