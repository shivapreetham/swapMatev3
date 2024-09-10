import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaSchool, FaUserCircle, FaTrophy, FaSyncAlt, FaUpload, FaTrash } from 'react-icons/fa';
import { MdEvent, MdSwapCalls } from 'react-icons/md';
import Avatar, { ConfigProvider } from 'react-avatar';
import axios from 'axios';

export default function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`/api/user/profile/${userId}`);
        setUser(data);
        setAvatar(data.avatar || null);
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
            </div>
          </div>
        </div>

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
            <h2 className="text-2xl font-semibold mb-4">Overall Performance</h2>
            <ul className="list-none space-y-3">
              <li className="flex items-center">
                <FaSchool className="mr-2 text-teal-400" /> Total Classes Attended: {user.overallAttendedClasses}
              </li>
              <li className="flex items-center">
                <FaSchool className="mr-2 text-teal-400" /> Total Classes: {user.overallTotalClasses}
              </li>
              <li className="flex items-center">
                <FaTrophy className="mr-2 text-yellow-500" /> Overall Percentage: {user.overallPercentage}%
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Choose an Avatar</h2>
          <div className="flex space-x-4">
            {avatarOptions.map((option) => (
              <div
                key={option}
                className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-4 ${
                  avatar === option ? 'border-blue-500' : 'border-gray-600'
                }`}
                onClick={() => handleAvatarSelect(option)}
              >
                <Avatar name={option} round size="64" textSizeRatio={2} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
