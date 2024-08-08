import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <input
          type="file"
          id="profile-pic-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handlePicChange}
        />
        <label htmlFor="profile-pic-input" className="profile-pic-label">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div className="default-avatar">👤</div>
          )}
        </label>
        <div className="profile-name">
          <h1>{localStorage.getItem('username')?.toUpperCase()}</h1>
        </div>
      </div>
      <nav className="nav-links">
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/registered-events" className="nav-link">My Events</Link> {/* Updated link */}
        <button onClick={handleLogout} className="logout-btn">Log Out</button>
      </nav>
    </div>
  );
};

export default Sidebar;