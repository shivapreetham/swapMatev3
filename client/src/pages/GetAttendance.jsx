import React, { useEffect, useState } from "react";
import axios from "../configuration";

export default function GetAttendancePage() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // or however you store the token
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!attendanceData) {
    return <div>No attendance data available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Attendance Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-4">Subject</th>
              <th className="border-b-2 p-4">Attended Classes</th>
              <th className="border-b-2 p-4">Total Classes</th>
              <th className="border-b-2 p-4">Attendance %</th>
              <th className="border-b-2 p-4">Above 75%</th>
              <th className="border-b-2 p-4">Classes Needed</th>
              <th className="border-b-2 p-4">Classes Can Skip</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(attendanceData.attendanceRecords).map(
              ([subjectKey, record]) => (
                <tr key={subjectKey}>
                  <td className="border-b p-4">{subjectKey}</td>
                  <td className="border-b p-4">{record.attendedClasses}</td>
                  <td className="border-b p-4">{record.totalClasses}</td>
                  <td className="border-b p-4">
                    {record.attendancePercentage.toFixed(2)}%
                  </td>
                  <td className="border-b p-4">
                    {record.isAbove75 ? "Yes" : "No"}
                  </td>
                  <td className="border-b p-4">{record.classesNeeded}</td>
                  <td className="border-b p-4">{record.classesCanSkip}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Overall Attendance
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-200">
          Total Classes Attended: {attendanceData.overallAttendedClasses}
        </p>
        <p className="mt-1 text-gray-700 dark:text-gray-200">
          Total Classes Held: {attendanceData.overallTotalClasses}
        </p>
        <p className="mt-1 text-gray-700 dark:text-gray-200">
          Overall Attendance Percentage:{" "}
          {attendanceData.overallPercentage.toFixed(2)}%
        </p>
        <p className="mt-1 text-gray-700 dark:text-gray-200">
          {attendanceData.totalCheck
            ? "You are above 75% in all subjects."
            : "You are below 75% in one or more subjects."}
        </p>
      </div>
    </div>
  );
}
