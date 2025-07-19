"use client";
import { useState } from "react";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import Spinner from "../Spinner";

function WaitlistForm() {
  const [isLoadig, setIsLoading] = useState(false);

  function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    fetch("/api/waitlist/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you for joining the waitlist!");
        } else {
          alert("Failed to join the waitlist. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("An error occurred. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <form className="flex gap-2" onSubmit={sendEmail}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email to join waitlist"
          className="max-w-lg flex-1 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          aria-label="Email address for waitlist"
        />
        <Button
          type="submit"
          className="h-12 px-6 bg-gray-900 text-white hover:bg-gray-800 rounded-lg"
        >
          Join Waitlist
        </Button>
        {isLoadig && <Spinner />}
      </form>
      <p className="text-xs text-gray-500">
        Be among the first to experience Designspo. We respect your privacy.
      </p>
    </>
  );
}

export default WaitlistForm;
