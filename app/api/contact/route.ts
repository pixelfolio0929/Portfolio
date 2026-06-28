import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        ok: false, 
        message: 'Missing required fields: name, email, and message are required' 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing environment variables EMAIL_USER or EMAIL_PASS');
      return new Response(JSON.stringify({ 
        ok: false, 
        message: 'Server configuration error. Please contact the site administrator.' 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      return new Response(JSON.stringify({ 
        ok: false, 
        message: 'Email configuration error. Please contact the site administrator.' 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Define email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: subject ? `Portfolio Contact: ${subject}` : `Portfolio Contact from ${name}`,
      text: `
        You have received a new message from your portfolio website.
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject || 'No subject'}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return new Response(JSON.stringify({ 
      ok: true, 
      message: 'Message sent successfully! I will get back to you soon.' 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e: any) {
    console.error('Error sending email:', e);
    // Return a more user-friendly error message
    const errorMessage = e.message || 'Unknown error';
    // Don't expose internal error details to the client
    const userMessage = process.env.NODE_ENV === 'development' 
      ? `Failed to send message: ${errorMessage}`
      : 'Failed to send message. Please try again later.';
    
    return new Response(JSON.stringify({ 
      ok: false, 
      message: userMessage
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}