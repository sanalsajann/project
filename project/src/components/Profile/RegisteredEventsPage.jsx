import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './RegisteredEventsPage.css'; // Ensure you have this CSS file or adjust as needed

const RegisteredEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
        const username = localStorage.getItem('username');
        if (!username) {
          setError('No user logged in');
          setLoading(false);
          return;
        }
      
        try {
          const profileResponse = await axios.get(`http://localhost:4002/profiles/${username}`);
          const registeredEventIds = profileResponse.data.registered_events || [];
          console.log("Profile registered events:", registeredEventIds); // Log profile registered events
      
          if (registeredEventIds.length === 0) {
            setEvents([]);
            setLoading(false);
            return;
          }
      
          const eventsResponse = await axios.post(`http://localhost:4002/fetch-events`, {
            registered_events: registeredEventIds
          });
          console.log("Events response:", eventsResponse.data); // Log events response
      
          setEvents(eventsResponse.data);
        } catch (err) {
          setError('Error fetching events');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      

    fetchRegisteredEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="registered-events-page">
      <Sidebar />
      <div className="content">
        <h1>Registered Events</h1>
        {events.length === 0 ? (
          <p>No registered events found.</p>
        ) : (
          <div className="event-cards">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <a href={event.url} target="_blank" rel="noopener noreferrer">More Details</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredEventsPage;
