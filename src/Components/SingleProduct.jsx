import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SingleProduct = ({ item, onDelete, userEmail }) => {
  const {
    _id,
    uName,
    title,
    description,
    location,
    dateTime,
    attendeeCount: initialAttendeeCount,
    email,
  } = item;

  const [attendeeCount, setAttendeeCount] = useState(initialAttendeeCount || 0);
  const [joined, setJoined] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    await fetch(`https://event-manager-server-bqcq.onrender.com/events/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Deleted Successfully");
        onDelete(_id);
      });
  };

  const handleJoin = async () => {
    if (joined) return toast.error("You already joined this event");

    try {
      const res = await fetch(`https://event-manager-server-bqcq.onrender.com/events/join/${_id}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.modifiedCount > 0) {
        setAttendeeCount(attendeeCount + 1);
        setJoined(true);
        toast.success("You joined the event!");
      } else {
        toast.error("Failed to join event.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="card bg-white shadow-md rounded-md p-4 space-y-3 border">
      <h2 className="text-xl font-bold text-orange-600">{title}</h2>

      <div className="text-sm text-gray-700">
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Date & Time:</strong> {new Date(dateTime).toLocaleString()}</p>
        <p><strong>Posted By:</strong> {userEmail === email ? "Me" : uName}</p>
        <p><strong>Attendee Count:</strong> {attendeeCount}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {userEmail === email ? (
          <>
            <button
              onClick={handleDelete}
              className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
            <Link to={`/events/edit/${_id}`}>
              <button className="px-3 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black">
                Edit
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleJoin}
            className={`px-3 py-2 rounded-lg ${joined ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white`}
            disabled={joined}
          >
            {joined ? "Joined" : "Join Event"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
