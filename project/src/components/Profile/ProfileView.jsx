import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileView.css';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faCalendarAlt, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        setError('No user logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4002/profiles/${username}`);
        setProfile(response.data);
        setEditableProfile(response.data); // Initialize editable profile
      } catch (err) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) return;

      // Send updated data to the server
      const response = await axios.put(`http://localhost:4002/profiles/${username}`, editableProfile);
      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      setError('Error updating profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0]; // Extract only the date part
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-view-container">
      <Sidebar />
      <div className="profile-view">
        <h1 className="typing-animation">Profile</h1>
        <br />
        <div className="profile-details">
          {isEditing ? (
            <>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={faUser} /> Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={editableProfile.name || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth:
                </label>
                <input
                  type="date"
                  name="dob"
                  value={editableProfile.dob ? formatDate(editableProfile.dob) : ''}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={editableProfile.gender === 'Male' ? faMars : faVenus} /> Gender:
                </label>
                <select
                  name="gender"
                  value={editableProfile.gender || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={faEnvelope} /> Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={editableProfile.email || ''}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={faPhone} /> Phone Number:
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editableProfile.phone || ''}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button className="edit-btn" onClick={handleSaveClick}>Save</button>
            </>
          ) : (
            <>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={faUser} /> Name:
                </label>
                <input type="text" value={profile.name || ''} readOnly />
              </div>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Date of Birth:
                </label>
                <input type="text" value={profile.dob ? formatDate(profile.dob) : ''} readOnly />
              </div>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={profile.gender === 'Male' ? faMars : faVenus} /> Gender:
                </label>
                <input type="text" value={profile.gender || ''} readOnly />
              </div>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={faEnvelope} /> Email:
                </label>
                <input type="text" value={profile.email || ''} readOnly />
              </div>
              <div className="profile-detail">
                <label className="profile-label">
                  <FontAwesomeIcon icon={faPhone} /> Phone Number:
                </label>
                <input type="text" value={profile.phone || ''} readOnly />
              </div>
              <br />
              <button className="edit-btn" onClick={handleEditClick}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
