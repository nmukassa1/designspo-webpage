import { createClient } from "@/app/supabase/superbaseServer";
import type { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    const body = await req.json();
    const { email: userEmail } = body;
    let email: string | undefined = userEmail;
    email = email?.trim();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      console.error("Invalid email:", email);
      return new Response(JSON.stringify({ message: "Missing email" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("Waiting-list")
      .insert([{ email }])
      .select();

    if (error) {
      console.error("Database error:", error);
      return new Response(JSON.stringify({ message: "Database error" }), {
        status: 500,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    });

    const sendingConfirmationEmail = await transporter.sendMail({
      from: '"Designspo" <no-reply@designspo.com>',
      subject: "You're on the waitlist!",
      to: email,
      text: `Thank you for joining the waitlist! We will notify you when we launch.`,
    });

    if (sendingConfirmationEmail.rejected.length > 0) {
      console.error(
        "Failed to send confirmation email:",
        sendingConfirmationEmail.rejected
      );
      return new Response(JSON.stringify({ message: "Email failed to send" }), {
        status: 500,
      });
    }

    const appEmail = process.env.NEXT_PUBLIC_SMTP_USER;

    await transporter.sendMail({
      from: '"Designspo" <no-reply@designspo.com>',
      subject: "New Waitlist Sign-Up",
      to: appEmail,
      text: `You've received a new waitlist sign-up: ${email}`,
    });

    return new Response(JSON.stringify({ message: "Email sent!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ message: "Email failed to send" }), {
      status: 500,
    });
  }
}
