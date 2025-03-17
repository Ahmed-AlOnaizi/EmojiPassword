import React, { useState } from "react";
import "./IPhoneLayout.css"; 


const emojisFixed = [
  "😀","😁","😂",
  "🤣","😃","😄",
  "😅","😆","😉",
  "🫡"
];

function VariantB() {
  const [username, setUsername] = useState("");
  const [emojiPin, setEmojiPin] = useState([]);
  const [message, setMessage] = useState("");

 
  const firstNine = emojisFixed.slice(0, 9); 
  const lastOne = emojisFixed[9];

  function handleEmojiClick(emoji) {

    if (emojiPin.length >= 4) {
        setMessage("You can only have a maximum of 4 emojis in your PIN.");
        return;
      }
    setEmojiPin([...emojiPin, emoji]);
  }

  // Registration
  async function handleRegister() {
    if (!username || emojiPin.length === 0) {
      setMessage("Please enter a username and select emojis.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          pin: emojiPin.join("")
        })
      });
      const data = await response.json();
      setMessage(data.message || "Registration failed.");
      setEmojiPin([]); // clear
    } catch (error) {
      console.error(error);
      setMessage("Server error during registration.");
    }
  }

  // Login
  async function handleLogin() {
    if (!username || emojiPin.length === 0) {
      setMessage("Please enter a username and select emojis.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          pin: emojiPin.join("")
        })
      });
      const data = await response.json();
      setMessage(data.message || "Login failed.");
      setEmojiPin([]); // clear
    } catch (error) {
      console.error(error);
      setMessage("Server error during login.");
    }
  }

  return (
    <div style={{ margin: "20px" }}>
      <h2>Variant B: Emoji PIN (Fixed iPhone Layout, No Blanks)</h2>

      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <p>Select emojis for your PIN (fixed layout):</p>
      <div className="iphone-grid">
        {firstNine.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => handleEmojiClick(emoji)}
            className="emoji-button"
          >
            {emoji}
          </button>
        ))}

        {lastOne && (
          <button
            onClick={() => handleEmojiClick(lastOne)}
            className="emoji-button center-bottom"
          >
            {lastOne}
          </button>
        )}
      </div>

      <p>Selected PIN: {emojiPin.join(" ")}</p>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
          Login
        </button>
      </div>

      <p style={{ marginTop: "10px", color: "blue" }}>{message}</p>
    </div>
  );
}

export default VariantB;
