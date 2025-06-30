import React, { useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../provider/AuthProvider";

const AddEvent = () => {
  const { user } = useContext(AuthContext);

  const formSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const uName = form.uName.value;
    const email = form.email.value;
    const dateTime = form.dateTime.value;
    const location = form.location.value;
    const description = form.description.value;

    const data = {
      title,
      uName,
      email,
      dateTime,
      location,
      description,
      attendeeCount: 0 // default
    };

    if (!window.confirm("Add this Event?")) return;

    await fetch("https://event-manager-server-bqcq.onrender.com/events", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.reset();
        toast.success("Event added successfully!");
      });
  };

  return (
    <div>
      <Toaster />
      <h1 className="text-orange-500 text-3xl font-bold text-center mb-10">
        Add an Event
      </h1>

<form
  onSubmit={formSubmit}
  className="max-w-2xl mx-auto  space-y-6"
>

  {/* Event Title */}
  <div className="flex flex-col">
    <label htmlFor="title" className="mb-1 font-medium text-gray-700">Event Title</label>
    <input
      id="title"
      type="text"
      name="title"
      required
      placeholder="Enter event title"
      className="input border border-orange-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
    />
  </div>

  {/* Description */}
  <div className="flex flex-col">
    <label htmlFor="description" className="mb-1 font-medium text-gray-700">Description</label>
    <textarea
      id="description"
      name="description"
      placeholder="Enter event description"
      className="input border border-orange-400 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
    ></textarea>
  </div>

  {/* Name */}
  <div className="flex flex-col">
    <label htmlFor="uName" className="mb-1 font-medium text-gray-700">Your Name</label>
    <input
      id="uName"
      type="text"
      name="uName"
      defaultValue={user?.displayName}
      placeholder="Enter your name"
      className="input border border-orange-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
    />
  </div>

  {/* Location */}
  <div className="flex flex-col">
    <label htmlFor="location" className="mb-1 font-medium text-gray-700">Location</label>
    <input
      id="location"
      type="text"
      name="location"
      required
      placeholder="Event location"
      className="input border border-orange-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
    />
  </div>

  {/* Date & Time */}
  <div className="flex flex-col">
    <label htmlFor="dateTime" className="mb-1 font-medium text-gray-700">Date & Time</label>
    <input
      id="dateTime"
      type="datetime-local"
      name="dateTime"
      required
      className="input border border-orange-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
    />
  </div>

  {/* Email */}
  <div className="flex flex-col hidden">
    <label htmlFor="email" className="mb-1 font-medium text-gray-700">Your Email</label>
    <input
      id="email"
      type="text"
      name="email"
      defaultValue={user?.email}
      disabled
      className="input border border-orange-400 bg-gray-100 text-gray-500 rounded px-4 py-2 cursor-not-allowed"
    />
  </div>

  {/* Submit Button */}
  <div className="text-center">
    <input
      type="submit"
      value="Add Event"
      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded cursor-pointer transition duration-200"
    />
  </div>
</form>

    </div>
  );
};

export default AddEvent;
