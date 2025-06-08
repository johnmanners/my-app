"use client"; // Makes this a client component (needed for useState)

import { useState } from "react";
import { postToAPI } from "../../utils/api";
import { ENDPOINTS } from "../../utils/endpoints";
import { clsx } from "clsx";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [sendingDetails, setSendingDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    let errMsg = "";

    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      errMsg = "Please fill in all fields!";
      setErrorMessage(errMsg);
    }

    console.log("form: ", form);
    console.log("error: ", errMsg);

    if (!errMsg) {
      try {
        setSendingDetails(true);
        await postToAPI(ENDPOINTS.CONTACT, form);
        setSendingDetails(false);
        setSuccessMessage("Message sent!");
        setForm({ firstName: "", lastName: "", email: "", message: "" });
      } catch (err) {
        setSendingDetails(false);
        setErrorMessage(`Error: ${err.message}`);
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Message</label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className={clsx(
            "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer",
            { "cursor-not-allowed!": sendingDetails || successMessage },
            { "bg-green-500 hover:bg-green-500": successMessage }
          )}
          disabled={sendingDetails || successMessage}>
          Send
        </button>
      </form>
      {errorMessage && <div className="mt-4 text-center">{errorMessage}</div>}
      {successMessage && (
        <div className="mt-4 text-center">{successMessage}</div>
      )}
    </div>
  );
}
