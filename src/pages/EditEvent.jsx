import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const EditEvent = () => {
  const event = useLoaderData(); // loaded from useLoaderData route
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(event.title);
  const [uName, setUname] = useState(event.uName);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [dateTime, setDateTime] = useState(event.dateTime);

  const formSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      title,
      uName,
      description,
      location,
      dateTime,
    };
    console.log(user.name);
    

    await fetch(`http://localhost:5000/events/${event._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Event updated successfully");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <Toaster />

      <h1 className="text-orange-500 text-3xl font-bold text-center mb-10">
        Edit Event
      </h1>

      <form
        onSubmit={formSubmit}
        className="flex flex-col gap-4 bg-white p-5 border rounded-lg shadow"
      >
        <label>
          Event Title:
          <input
            type="text"
            name="title"
            className="input border w-full border-orange-500 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Your Name:
          <input
            type="text"
            name="uName"
            className="input border w-full border-orange-500 mt-1"
            value={uName}
            onChange={(e) => setUname(e.target.value)}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            className="input border w-full border-orange-500 mt-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>

        <label>
          Date & Time:
          <input
            type="datetime-local"
            name="dateTime"
            className="input border w-full border-orange-500 mt-1"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            className="input border h-32 w-full border-orange-500 mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
