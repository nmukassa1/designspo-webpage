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
    <div className="mx-6 p-6 bg-white shadow rounded-xl flex gap-20">
      <div>
        <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
        <p className="text-gray-500 mb-6">Update your personal details here.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grow-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          onClick={handleCancel}
          className="text-gray-600 hover:underline"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="text-blue-500 font-semibold hover:underline"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
