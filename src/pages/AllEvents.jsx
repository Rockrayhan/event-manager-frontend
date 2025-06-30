import React, { useContext, useEffect, useState } from "react";
import SingleProduct from "../Components/SingleProduct";
import { AuthContext } from "../provider/AuthProvider";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const userEmail = user?.email;

  useEffect(() => {
    setLoading(true);
    fetch("https://event-manager-server-bqcq.onrender.com/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.uName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, events]);

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event._id !== id));
  };

  return (
    <div>
      <h1 className="text-orange-500 text-3xl font-bold text-center mb-5">
        Here are all {filteredEvents.length} Events
      </h1>
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        {loading ? (
          <div className="text-center">
            Please wait ... <br />
            <span className="loading loading-spinner loading-lg text-orange-500 py-3"></span>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-32 container">
            {filteredEvents.map((item) => (
              <div className="col-span-1" key={item._id}>
                <SingleProduct
                  item={item}
                  onDelete={handleDeleteEvent}
                  userEmail={userEmail}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
