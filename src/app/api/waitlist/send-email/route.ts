import { createClient } from "@/app/supabase/superbaseServer";
import { NextRequest, NextResponse } from "next/server";
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
      return NextResponse.json({
        message: "Missing email",
        status: 400,
      });
    }

    // Check if email already exists in the waiting list
    const { data: existingEmail, error: checkError } = await supabase
      .from("Waiting-list")
      .select("email")
      .eq("email", email)
      .single();

    if (existingEmail) {
      console.log("Email already exists in the waiting list:", email);
      return NextResponse.json({
        message: "Email already exists",
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("Waiting-list")
      .insert([{ email }])
      .select();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ message: "Error storing email", status: 500 });
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
      return NextResponse.json({
        message: "Email failed to send",
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

    return NextResponse.json({ message: "Email sent!", status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ message: "Email failed to send", status: 500 });
  }
}
