"use client";
import React, { useState } from "react";

const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "Carter",
    lastName: "Leadstream",
    email: "carter@domain.com",
    phone: "+16215918763",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    // Reset to default values (could be updated to previous values instead)
    setFormData({
      firstName: "Carter",
      lastName: "Leadstream",
      email: "carter@domain.com",
      phone: "+16215918763",
    });
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saved Data:", formData);
  };

  return (
    <div className="mx-6 flex gap-20 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Update your personal details here.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grow-1">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-foreground">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-sm font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
