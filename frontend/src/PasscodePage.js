import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PasscodePage() {
  const location = useLocation();
  const { username, mode } = location.state || {};
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDigitClick = (digit) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + digit;
      setPasscode(newPasscode);
      if (newPasscode.length === 4) {
        // Determine the endpoint based on mode:
        const endpoint =
          mode === "register"
            ? "http://localhost:5000/api/register"
            : "http://localhost:5000/api/login";

        // Send username and plain-text passcode as "pin"
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, pin: newPasscode }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (mode === "register") {
              if (data.message === "Registered successfully!") {
                setMessage("Account created! Redirecting to login...");
                setTimeout(() => {
                  navigate("/"); // Return to UsernamePage for login
                }, 2000);
              } else {
                setMessage(data.message || "Error creating account");
                setPasscode(""); // Reset on error
              }
            } else {
              // Login mode
              if (data.message === "Login successful!") {
                setMessage(`Passcode correct! Welcome, ${username}`);
                // Further actions on successful login can be added here
              } else {
                setMessage("Incorrect passcode. Try again.");
                setTimeout(() => {
                  setPasscode("");
                  setMessage("");
                }, 2000);
              }
            }
          })
          .catch((err) => {
            console.error("Error:", err);
            setMessage("An error occurred.");
          });
      }
    }
  };

  const handleClear = () => {
    setPasscode("");
    setMessage("");
  };

  const renderPasscodeDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      dots.push(
        <span
          key={i}
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            margin: "5px",
            borderRadius: "50%",
            backgroundColor: i < passcode.length ? "black" : "lightgray",
          }}
        ></span>
      );
    }
    return dots;
  };

  const renderKeypad = () => {
    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          maxWidth: "200px",
          margin: "20px auto",
        }}
      >
        {digits.map((d) => (
          <button
            key={d}
            onClick={() => handleDigitClick(d)}
            style={{ fontSize: "18px", padding: "10px" }}
          >
            {d}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>
        {mode === "register" ? "Set Your Password" : "Enter Your Password"}
      </h1>
      {username && <p>User: {username}</p>}
      <div style={{ marginBottom: "20px" }}>{renderPasscodeDots()}</div>
      {renderKeypad()}
      <br />
      <button onClick={handleClear} style={{ padding: "5px 10px" }}>
        Clear
      </button>
      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}

export default PasscodePage;
