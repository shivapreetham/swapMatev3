import React, { useState } from "react";
import axios from "../configuration";
import BorderMagicButton from "../components/Buttons/BorderMagicButton"; // Adjust the import path as necessary
export default function AttendanceForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = { username, password };

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Website Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Website Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Attendance"}
        </button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
}
