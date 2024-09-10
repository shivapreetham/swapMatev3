import React, { useState } from "react";
import axios from "../configuration";
import BorderMagicButton from "../components/Buttons/BorderMagicButton"; // Adjust the import path as necessary

const subjectsList = [
  "Subject 1",
  "Subject 2",
  "Subject 3",
  "Subject 4",
  "Subject 5",
  "Subject 6",
  "Subject 7",
];

export default function AttendanceForm() {
  const [subjects, setSubjects] = useState(
    subjectsList.map((subject) => ({
      name: subject,
      attended: false,
      classHeld: false,
    }))
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    if (field === "classHeld" && !value) {
      updatedSubjects[index].attended = false; // Reset attended if class is not held
    }
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const date = new Date().toISOString().slice(0, 10);
    const data = { date, subjects };

    try {
      const response = await axios.post("/api/attendance/mark", data);
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response ? error.response.data.message : "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Mark Attendance
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
          >
            <label className="font-medium text-gray-700 dark:text-gray-200">
              {subject.name}
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={subject.classHeld}
                  onChange={(e) =>
                    handleChange(index, "classHeld", e.target.checked)
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-200">Held</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={subject.attended}
                  onChange={(e) =>
                    handleChange(index, "attended", e.target.checked)
                  }
                  disabled={!subject.classHeld} // Disable if the class is not held
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="text-gray-700 dark:text-gray-200">
                  Attended
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <BorderMagicButton disabled={loading}>
            {loading ? "Submitting..." : "Submit Attendance"}
          </BorderMagicButton>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </div>
  );
}
