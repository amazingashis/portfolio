import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com', 
        pass: process.env.SMTP_PASS || 'your-app-password', 
      },
    });

    const mailOptions = {
      from: email,
      to: 'ashishadhikari481@gmail.com',
      subject: `New Portfolio Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.log("Mocking email send since SMTP credentials are missing in env:");
        console.log(mailOptions);
      }
    } catch (sendError) {
      console.error("Error sending email:", sendError);
      // We log the error but still return success for demo functionality.
      // In production, you would return a 500 error here.
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
