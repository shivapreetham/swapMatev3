import React, { useEffect, useState } from "react";
import axios from "../configuration";

export default function GetAttendancePage() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/api/attendance/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttendanceData(response.data);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "Server error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!attendanceData) {
    return <div className="text-center">No attendance data available</div>;
  }

  const {
    attendanceData: { subjects },  // Access subjects
    dailyAttendance,
    userAttendanceMetrics,
  } = attendanceData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Attendance Summary
      </h2>

      {/* Display overall attendance data */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Overall Attendance
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-200">
          Total Classes Attended: {userAttendanceMetrics?.overallAttendedClasses || 0}
        </p>
        <p className="mt-1 text-gray-700 dark:text-gray-200">
          Total Classes Held: {userAttendanceMetrics?.overallTotalClasses || 0}
        </p>
        <p className="mt-1 text-gray-700 dark:text-gray-200">
          Overall Attendance Percentage:{" "}
          {userAttendanceMetrics?.overallPercentage?.toFixed(2) || "0.00"}%
        </p>
        <p className="mt-1 text-gray-700 dark:text-gray-200">
          {userAttendanceMetrics?.totalCheck
            ? "You are above 75% in all subjects."
            : "You are below 75% in one or more subjects."}
        </p>
      </div>

      {/* Display detailed attendance data */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-4">Subject</th>
              <th className="border-b-2 p-4">Attended Classes</th>
              <th className="border-b-2 p-4">Total Classes</th>
              <th className="border-b-2 p-4">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <tr key={subject.subjectCode}>
                  <td className="border-b p-4">{subject.subjectName}</td>
                  <td className="border-b p-4">{subject.presentTotal.split("/")[0]}</td>
                  <td className="border-b p-4">{subject.presentTotal.split("/")[1]}</td>
                  <td className="border-b p-4">
                    {subject.attendancePercentage}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No subject attendance data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display daily attendance data */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Daily Attendance (Last 7 Days)
        </h3>
        <ul className="mt-2">
          {dailyAttendance.length > 0 ? (
            dailyAttendance.map((record, index) => (
              <li key={`${record._id}-${index}`} className="border-b py-2">
                <p className="text-gray-700 dark:text-gray-200">
                  Date: {new Date(record.date).toLocaleDateString()}
                </p>
                <ul className="mt-1 pl-4">
                  {record.subjects.length > 0 ? (
                    record.subjects.map((subject) => (
                      <li key={`${subject.subjectCode}-${index}`} className="py-1">
                        {subject.subjectName}: {subject.attendedClasses}/{subject.totalClasses}
                      </li>
                    ))
                  ) : (
                    <li className="text-center py-2">No classes on this day</li>
                  )}
                </ul>
              </li>
            ))
          ) : (
            <li className="text-center py-2">No daily attendance records available</li>
          )}
        </ul>
      </div>
    </div>
  );
}
