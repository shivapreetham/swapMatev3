import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const fetchAttendanceData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
      const response = await axios.get('http://localhost:5000/api/attendance/calender', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log('Attendance data:', response.data);
      } else {
        console.error('Error fetching attendance data:', response);
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };
  
  useEffect(() => {
    fetchAttendanceData(); 
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Attendance Calendar</h1>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Date</th>
              <th className="py-2 px-4 border-b border-gray-700">Subject</th>
              <th className="py-2 px-4 border-b border-gray-700">Classes Held</th>
              <th className="py-2 px-4 border-b border-gray-700">Attended</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((record, index) => (
                <React.Fragment key={index}>
                  {record.subjects.map((subject, subIndex) => (
                    <tr key={subIndex} className="hover:bg-gray-700">
                      {subIndex === 0 && (
                        <td
                          rowSpan={record.subjects.length}
                          className="py-2 px-4 border-b border-gray-700 text-center"
                        >
                          {record.date}
                        </td>
                      )}
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        {subject.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        {subject.classHeld}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 text-center">
                        {subject.attended}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 text-center">
                  No attendance records found for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
