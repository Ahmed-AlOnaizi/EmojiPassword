import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UsernamePage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setError("Please enter a username");
      return;
    }
    // Navigate to PasscodePage, passing username as state
    navigate("/passcode", { state: { username } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome</h1>

      {/* Username Input + Error Handling */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <br />
        <br />
        <button
          type="submit"
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Continue
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create Account Button */}
      <button
        onClick={() => navigate("/register")}
        style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
      >
        Create Account
      </button>
    </div>
  );
}

export default UsernamePage;
