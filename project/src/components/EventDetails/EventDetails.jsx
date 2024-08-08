import React, { useState } from 'react';
import './EventDetails.css'; // Ensure this CSS file exists and styles the class names used
import Navbar2 from './Navbar2';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Snackbar, Alert } from '@mui/material';

const EventDetails = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    axios.get(`http://localhost:4002/eventpages/${eventId}`)
      .then(response => {
        console.log('Event Data:', response.data); // Log the response data
        setEventData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the event data!', error);
      });
  }, [eventId]);

  const handleRegister = () => {
    console.log('Registration successful');
    setOpenSnackbar(true); // Show Snackbar on successful registration
    setTimeout(() => {
      navigate('/'); // Route to homepage after showing the Snackbar
    }, 1500); // Adjust the timeout as needed
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Hide Snackbar when closed
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar2 />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on small screens
          padding: '20px',
          gap: '20px',
        }}
      >
        {/* Left Container */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            padding: '10px',
          }}
        >
          {/* Video Section */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/AMXxbQtd8VA"
              title="Event Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>

          {/* Google Maps Section */}
          <Box
            sx={{
              flex: 1,
              height: '300px', // Adjust height as needed
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0221182619444!2d-122.084249684681!3d37.421999279825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5d30fd9c22d%3A0x3e567f26b3f470d1!2sGoogleplex!5e0!3m2!1sen!2sus!4v1639571718290!5m2!1sen!2sus"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Box>

        {/* Right Container */}
        <Box
          sx={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div className="event-details-container">
            <div className="event-status">
              <span className="status">Upcoming</span>
            </div>
            <h1 className="event-title">{eventData.title}</h1>
            <div className="event-info">
              <div className="event-date">
                <span role="img" aria-label="calendar">📅</span> {eventData.date}
              </div>
              <div className="event-time">
                <span role="img" aria-label="clock">🕘</span> {eventData.time}
              </div>
              <div className="event-location">
                <span role="img" aria-label="location">📍</span> {eventData.address}
              </div>
            </div>
            <h2 className="event-description-title">Event Description</h2>
            <p className="event-description">
              {eventData.description}
            </p>
            <h2 className="event-organizer-title">Organizer</h2>
            <div className="event-organizer">
              <div className="organizer-info">
                <div className="organizer-avatar">
                  <span role="img" aria-label="organizer">👤</span>
                </div>
                <div className="organizer-details">
                  <p className="organizer-name">{eventData.orgName}</p>
                  <p className="organizer-company">{eventData.orgCompany}</p>
                </div>
              </div>
            </div>
            {/* Register Now Button */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 'auto', // Push the button to the bottom
              }}
            >
              <Button
                variant="contained"
                onClick={handleRegister}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: 'darkgrey',
                  }
                }}
              >
                Register Now
              </Button>
            </Box>
          </div>
        </Box>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Duration for the Snackbar to be visible
        onClose={handleCloseSnackbar}
        message="Registration successful!"
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Registration successful!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EventDetails;
