"use client";

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/app/components/shadcn/input-otp";
import { Button } from "@/app/components/shadcn/button";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie"; // ✅ client-side

type FormValues = {
  otp: string;
};

export default function AdminPage() {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const onSubmit = (data: FormValues) => {
    const otp = data.otp?.trim();

    if (!otp || otp.length !== 4) {
      alert("Please enter a valid 4-digit code.");
      return;
    }

    // ✅ Set cookie in client
    Cookies.set("otp_token", otp, {
      expires: 0.2083, // ≈5 hours

      // expires: 0.0104, // ≈15 minutes
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    console.log("Valid OTP submitted & stored in cookie:", otp);

    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/85">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-center">
        <InputOTP
          maxLength={4}
          value={otpValue}
          onChange={(val) => setValue("otp", val)}
        >
          <InputOTPGroup
            className={cn(
              "rounded-xl border border-neutral-300 bg-neutral-100 overflow-hidden",
              "h-16 w-auto"
            )}
          >
            <InputOTPSlot
              index={0}
              ref={firstInputRef}
              className={cn(
                "border-none text-neutral-800 text-2xl font-mono",
                "w-16 h-16",
                "border-r-2 border-neutral-300"
              )}
            />
            <InputOTPSlot
              index={1}
              className={cn(
                "border-none text-neutral-800 text-2xl font-mono",
                "w-16 h-16"
              )}
            />
          </InputOTPGroup>

          <InputOTPSeparator className="text-neutral-500 mx-4 text-3xl font-bold" />

          <InputOTPGroup
            className={cn(
              "rounded-xl border border-neutral-300 bg-neutral-100 overflow-hidden",
              "h-16 w-auto"
            )}
          >
            <InputOTPSlot
              index={2}
              className={cn(
                "border-none text-neutral-800 text-2xl font-mono",
                "w-16 h-16",
                "border-r border-neutral-300"
              )}
            />
            <InputOTPSlot
              index={3}
              className={cn(
                "border-none text-neutral-800 text-2xl font-mono",
                "w-16 h-16"
              )}
            />
          </InputOTPGroup>
        </InputOTP>

        <Button type="submit" className="mt-4">
          Submit OTP
        </Button>
      </form>
    </div>
  );
}
