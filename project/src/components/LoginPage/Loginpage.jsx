import React, { useState } from 'react';
import './Loginpage.css';
import { Box, TextField, Button, Typography, InputAdornment, Checkbox, FormControlLabel, Link as MuiLink } from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <div className="login-container">
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
        <Typography variant="h4" component="h2" className="login-header">
          Login
        </Typography>
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
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ color: '#007bff', '&.Mui-checked': { color: '#007bff' } }}
            />
          }
          label="Remember Me"
          sx={{ mb: 2 }}
        />
        <Link to="/">
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
          Login
        </Button>
        </Link>
        <Typography variant="body2" className="forgot-password">
          <MuiLink href="#" underline="hover" className="forgot-password-link">
            Forgot Password?
          </MuiLink>
        </Typography>
        <Typography variant="body2" className="signup-link">
          Don't have an account? <Link to="/Signuppage" className="signup-link-text">Sign Up</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Loginpage;
