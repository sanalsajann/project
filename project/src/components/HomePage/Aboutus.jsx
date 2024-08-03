import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AboutUs = () => {
  return (
    <Box
      sx={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor:'whitesmoke',
        borderRadius:'3%'
      }}
    >
      <Box
        sx={{
          marginBottom: '20px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '2.5em',
            color: '#333',
            marginBottom: '10px',
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2em',
            color: '#555',
          }}
        >
          Welcome to EventX!
        </Typography>
      </Box>

      <Box
        sx={{
          marginBottom: '20px',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: '1.8em',
            color: '#555',
            marginTop: '20px',
            marginBottom: '10px',
          }}
        >
          Who We Are
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1em',
            color: '#666',
            lineHeight: '1.6',
          }}
        >
          At EventX, we are passionate about creating unforgettable experiences. As a leading event management company, we specialize in organizing a wide range of events, from corporate conferences and trade shows to private parties and weddings.
        </Typography>
        <Typography  variant="body1"
          sx={{
            fontSize: '1.1em',
            color:'red',
            lineHeight: '1.6',
          }}>The team : Sanal,Roslina,Faris,Avin</Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: '1.8em',
            color: '#555',
            marginTop: '20px',
            marginBottom: '10px',
          }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1em',
            color: '#666',
            lineHeight: '1.6',
          }}
        >
          Our mission is to deliver seamless and extraordinary events tailored to our clients' needs. With a dedicated team of professionals and a commitment to excellence, we ensure every detail is perfect.
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: '1.8em',
            color: '#555',
            marginTop: '20px',
            marginBottom: '10px',
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1em',
            color: '#666',
            lineHeight: '1.6',
          }}
        >
          Have a question or want to get started on your next event? Reach out to us at <a href="mailto:info@eventx.com" style={{ color: '#007bff', textDecoration: 'none' }}>info@eventx.com</a> or call us at (123) 456-7890.
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: '30px',
          fontSize: '0.9em',
          color: '#999',
        }}
      >
        <Typography variant="body2">
          &copy; 2024 EventX. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs;
