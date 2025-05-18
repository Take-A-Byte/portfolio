import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { to, subject, text, recaptchaToken } = await request.json();

  // Verify reCAPTCHA
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return new Response(JSON.stringify({ message: 'reCAPTCHA verification failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

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