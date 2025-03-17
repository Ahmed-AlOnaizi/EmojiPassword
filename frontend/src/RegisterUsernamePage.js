import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterUsernamePage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    
    navigate("/set-passcode", { state: { username } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Create a New Account</h1>
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
    </div>
  );
}

export default RegisterUsernamePage;
