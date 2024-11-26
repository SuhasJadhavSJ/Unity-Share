import React, { useState } from 'react';
import './ProfileEdit.css';

function ProfileEdit({ user, onUpdateUser, onClose }) {
  const [name, setName] = useState(user.name);
  const [profilePic, setProfilePic] = useState(null); // To store the file object

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    onUpdateUser(formData); // Send the FormData to the parent component
  };

  return (
    <div className="edit-profile-modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit" className="save-button">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
