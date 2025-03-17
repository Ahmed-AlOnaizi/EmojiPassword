import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UsernamePage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // For logging in
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setError("Please enter a username");
      return;
    }
    
    navigate("/passcode", { state: { username, mode: "login" } });
  };

  // For registering
  const handleRegisterClick = () => {
    if (username.trim() === "") {
      setError("Please enter a username for registration");
      return;
    }
    
    navigate("/passcode", { state: { username, mode: "register" } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome</h1>
      <form onSubmit={handleLoginSubmit}>
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
          Continue (Login)
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
      <button
        onClick={handleRegisterClick}
        style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
      >
        Create Account (Register)
      </button>
    </div>
  );
}

export default UsernamePage;
