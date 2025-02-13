import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SetPasscodePage() {
  const location = useLocation();
  const { username } = location.state || {};
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDigitClick = (digit) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + digit;
      setPasscode(newPasscode);
      if (newPasscode.length === 4) {
        // Once 4 digits are entered, send the registration request using "password"
        fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password: newPasscode }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Registered successfully!") {
              setMessage("Account created! Redirecting to login...");
              setTimeout(() => {
                navigate("/"); // Redirect to the login page
              }, 2000);
            } else {
              setMessage(data.message || "Error creating account");
              setPasscode(""); // Reset passcode if error
            }
          })
          .catch((err) => {
            console.error("Error:", err);
            setMessage("Error connecting to server");
            setPasscode("");
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
      <h1>Set Your Password</h1>
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

export default SetPasscodePage;
