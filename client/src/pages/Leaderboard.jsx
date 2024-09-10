import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMedal, FaUserCircle } from 'react-icons/fa'; // Importing icons from react-icons

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('/api/attendance/leaderboard', {
        params: { sortBySubject: selectedSubject },
      });
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    fetchLeaderboard();
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getMedalIcon = (index) => {
    switch (index) {
      case 0:
        return <FaMedal className="text-yellow-500" />; // Gold Medal
      case 1:
        return <FaMedal className="text-gray-400" />; // Silver Medal
      case 2:
        return <FaMedal className="text-orange-500" />; // Bronze Medal
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>

      {/* Subject Selection */}
      <div className="flex justify-center mb-6">
        {['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6', 'subject7'].map((subject) => (
          <label key={subject} className="mx-2">
            <input
              type="radio"
              name="subject"
              value={subject}
              checked={selectedSubject === subject}
              onChange={handleSubjectChange}
              className="mr-2 text-black"
            />
            {subject.toUpperCase()}
          </label>
        ))}
        <label className="mx-2">
          <input
            type="radio"
            name="subject"
            value=""
            checked={selectedSubject === ''}
            onChange={handleSubjectChange}
            className="mr-2 text-black"
          />
          Overall
        </label>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Rank</th>
              <th className="py-2 px-4 border-b border-gray-700">Profile</th>
              <th className="py-2 px-4 border-b border-gray-700">Username</th>
              <th className="py-2 px-4 border-b border-gray-700">College Email</th>
              <th className="py-2 px-4 border-b border-gray-700">Overall Attendance (%)</th>
              {['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6', 'subject7'].map((subject) => (
                <th key={subject} className="py-2 px-4 border-b border-gray-700">{subject.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="py-2 px-4 border-b border-gray-700 text-center">
                  {getMedalIcon(index)}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-center">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full mx-auto" />
                  ) : (
                    <FaUserCircle className="text-gray-400 w-12 h-12 mx-auto" />
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">{user.username}</td>
                <td className="py-2 px-4 border-b border-gray-700">{user.collegeEmail}</td>
                <td className={`py-2 px-4 border-b border-gray-700 ${user.overallAttendancePercentage >= 75 ? 'text-green-400' : 'text-red-400'}`}>
                  {user.overallAttendancePercentage ? user.overallAttendancePercentage.toFixed(2) : 'N/A'}
                </td>
                {user.subjectData.map((subject, subIndex) => (
                  <td key={subIndex} className={`py-2 px-4 border-b border-gray-700 ${subject.isAbove75 ? 'text-green-400' : 'text-red-400'}`}>
                    {subject.percentage ? subject.percentage.toFixed(2) : 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
