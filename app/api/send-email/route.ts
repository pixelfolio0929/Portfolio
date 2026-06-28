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

    // Define email options for sending to site owner
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // This will be your email address
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

    // Send the email to site owner
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to site owner:', info.messageId);

    // Define auto-reply email options with your HTML template
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Thank You for Contacting Me</title>
          <style>
            body {
              font-family: 'Poppins', Arial, sans-serif;
              background-color: #f6f8fb;
              color: #333;
              padding: 25px;
              margin: 0;
            }
            .container {
              background-color: #fff;
              border-radius: 12px;
              padding: 25px;
              max-width: 650px;
              margin: 0 auto;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #0078ff;
              margin-bottom: 10px;
              font-size: 22px;
            }
            p {
              line-height: 1.6;
              margin: 6px 0;
              font-size: 16px;
            }
            .highlight {
              font-weight: 600;
              color: #0078ff;
            }
            .message-box {
              background: #f4f7ff;
              border-left: 4px solid #0078ff;
              padding: 12px 15px;
              margin: 10px 0;
              border-radius: 6px;
              font-style: italic;
              font-size: 15px;
            }
            a.button {
              display: inline-block;
              background: #0078ff;
              color: #fff !important;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 8px;
              margin-top: 12px;
              transition: 0.3s ease;
              font-size: 15px;
            }
            a.button:hover {
              background: #005fd4;
            }
            .contact-info {
              background: #f9f9f9;
              border-radius: 8px;
              padding: 10px 15px;
              font-size: 15px;
              margin-top: 20px;
            }
            .contact-info a {
              color: #0078ff;
              text-decoration: none;
            }

            /* Responsive Design */
            @media screen and (max-width: 600px) {
              body {
                padding: 10px;
              }
              .container {
                padding: 15px;
              }
              h2 {
                font-size: 20px;
              }
              p, .message-box, .contact-info {
                font-size: 14px;
              }
              a.button {
                font-size: 14px;
                padding: 8px 16px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Hey ${name}, 👋</h2>
            <p>Thank you for contacting me through my <span class="highlight">Portfolio Website</span>!</p>
            <p>I’ve received your message and I’ll get back to you soon.</p>

            <div class="message-box">
              "${message}"
            </div>

            

          
          </div>
        </body>
      </html>
    `;

    const autoReplyOptions = {
      from: `"Mohammad Sinan" <${process.env.EMAIL_USER}>`,
      to: email, // Send to the person who filled out the form
      subject: "Thank you for your message",
      text: `
        Hi ${name},
        
        Thank you for reaching out to me through my portfolio website. I've received your message and will get back to you as soon as possible.
        
        Your message:
        "${message}"
        
        Best regards,
        Mohammad Sinan
      `,
      html: autoReplyHtml,
    };

    // Send auto-reply email
    try {
      const autoReplyInfo = await transporter.sendMail(autoReplyOptions);
      console.log('Auto-reply sent:', autoReplyInfo.messageId);
    } catch (autoReplyError) {
      console.error('Failed to send auto-reply:', autoReplyError);
      // Don't fail the entire request if auto-reply fails
    }

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