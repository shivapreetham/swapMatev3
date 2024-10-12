import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaSchool, FaUserCircle, FaTrophy, FaSyncAlt, FaUpload, FaTrash, FaEdit } from 'react-icons/fa';
import { MdEvent, MdSwapCalls } from 'react-icons/md';
import Avatar from 'react-avatar';
import axios from 'axios';

export default function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    username: '',
    personalEmail: '',
    webUsername: '',
    webPassword: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`/api/user/profile/${userId}`);
        setUser(data);
        setAvatar(data.avatar || null);
        setUpdatedUserData({
          username: data.username,
          personalEmail: data.personalEmail,
          webUsername: data.webUsername,
          webPassword: '', // Keep the password field empty for security
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to load user data.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePic', file);

      try {
        const { data } = await axios.post(`/api/user/profile/${userId}/upload`, formData);
        setUser({ ...user, profilePic: data.profilePic });
      } catch (error) {
        setError('Failed to upload profile picture.');
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/user/profile/${userId}/delete`);
      setUser({ ...user, profilePic: null });
    } catch (error) {
      setError('Failed to delete profile picture.');
    }
  };

  const handleAvatarSelect = async (selectedAvatar) => {
    try {
      await axios.post(`/api/user/profile/${userId}/avatar`, { avatar: selectedAvatar });
      setAvatar(selectedAvatar);
    } catch (error) {
      setError('Failed to update avatar.');
    }
  };

  const handleEditToggle = () => {
    console.log("edit toggled")
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handling change");
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.put(`/api/user/profile/${userId}/edit`, updatedUserData);
      console.log("axios put working ")
      setUser({ ...user, ...updatedUserData }); // Update local state with new data
      setEditMode(false); // Exit edit mode
    } catch (error) {
      setError('Failed to update profile.');
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const avatarOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-10 max-w-4xl w-full">
        <div className="flex items-center mb-8">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt={`${user.username || 'User'} Profile`}
              className="w-32 h-32 rounded-full border-4 border-gray-700"
            />
          ) : (
            <Avatar name={user.username || 'User'} round size="128" textSizeRatio={2} />
          )}

          <div className="ml-8">
            <h1 className="text-4xl font-bold flex items-center">
              <FaUserCircle className="mr-3" /> {user.username}
            </h1>
            <p className="text-gray-400 flex items-center">
              <FaEnvelope className="mr-2" /> {user.collegeEmail}
            </p>
            <p className="text-gray-400 flex items-center">
              <FaEnvelope className="mr-2" /> {user.personalEmail}
            </p>

            <div className="mt-4 flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <FaUpload className="mr-2 text-green-400" />
                <input type="file" className="hidden" onChange={handleUpload} />
                Upload
              </label>
              <button className="flex items-center text-red-400" onClick={handleDelete}>
                <FaTrash className="mr-2" /> Delete
              </button>
              <button className="flex items-center text-blue-400" onClick={handleEditToggle}>
                <FaEdit className="mr-2" /> {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>
        </div>

        {editMode ? (
          <form onSubmit={handleUpdateProfile} className="mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={updatedUserData.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Personal Email:</label>
                <input
                  type="email"
                  name="personalEmail"
                  value={updatedUserData.personalEmail}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Web Username:</label>
                <input
                  type="text"
                  name="webUsername"
                  value={updatedUserData.webUsername}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Web Password:</label>
                <input
                  type="password"
                  name="webPassword"
                  value={updatedUserData.webPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">User Stats</h2>
              <ul className="list-none space-y-3">
                <li className="flex items-center">
                  <FaTrophy className="mr-2 text-yellow-500" /> Honor Score: {user.honorScore}
                </li>
                <li className="flex items-center">
                  <MdSwapCalls className="mr-2 text-blue-400" /> Swaps: {user.swaps}
                </li>
                <li className="flex items-center">
                  <FaSyncAlt className="mr-2 text-green-400" /> Login Days: {user.loginDays}
                </li>
                <li className="flex items-center">
                  <MdEvent className="mr-2 text-purple-400" /> Attendance Days: {user.attendanceDays}
                </li>
                <li className="flex items-center">
                  <FaSyncAlt className="mr-2 text-red-400" /> Login Streak: {user.loginStreak}
                </li>
                <li className="flex items-center">
                  <MdEvent className="mr-2 text-orange-400" /> Last Login Date: {new Date(user.lastLoginDate).toLocaleDateString()}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">My Subjects</h2>
              <ul className="list-none space-y-3">
                {user.subjects && user.subjects.map((subject) => (
                  <li key={subject.subjectCode} className="flex items-center">
                    <span className="flex-1">{subject.subjectName}</span>
                    <span className="text-gray-400">{subject.attendancePercentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
