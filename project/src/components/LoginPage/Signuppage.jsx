import React, { useState } from 'react';
import './Signuppage.css';
import { Box, TextField, Button, Typography, InputAdornment, Link as MuiLink } from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon, Person as PersonIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Signuppage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign-up logic here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signup-container">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2, width: '100%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" component="h2" className="signup-header">
          Sign Up
        </Typography>
        <TextField
          id="username"
          label="Username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="email"
          label="Email"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#007bff',
            '&:hover': { backgroundColor: '#0056b3' },
            borderRadius: '8px',
            padding: '12px',
            fontSize: '16px',
            width: '100%',
          }}
        >
          Sign Up
        </Button>
        <Typography variant="body2" className="login-link">
          Already have an account? <Link to="/Loginpage" className="login-link-text">Login</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Signuppage;
