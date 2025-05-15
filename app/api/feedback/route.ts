import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { to, subject, text } = await request.json();

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}