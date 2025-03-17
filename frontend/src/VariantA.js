import React, { useState, useEffect } from "react";
import "./IPhoneLayout.css"; 

const myEmojis = [
  "🐱","🐶","👽","🫡","💪",
  "🍎","🍉","🚗","🎱","❤️"
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function CenteredLastRowVariant() {
  const [username, setUsername] = useState("");
  const [emojiPin, setEmojiPin] = useState([]);
  const [message, setMessage] = useState("");
  const [shuffled, setShuffled] = useState([]);

  useEffect(() => {
    setShuffled(shuffleArray(myEmojis));
  }, []);

  function handleEmojiClick(emoji) {

    if (emojiPin.length >= 4) {
        setMessage("You can only have a maximum of 4 emojis in your PIN.");
        return;
      }
    setEmojiPin([...emojiPin, emoji]);
  }

  
  const topNine = shuffled.slice(0, 9); 
  const lastOne = shuffled[9];         

 
  async function handleRegister() {
    if (!username || emojiPin.length === 0) {
      setMessage("Please enter a username and pick emojis.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          pin: emojiPin.join("")
        })
      });
      const data = await res.json();
      setMessage(data.message || "Registration failed.");
      setEmojiPin([]);
      
      setShuffled(shuffleArray(myEmojis));
    } catch (err) {
      console.error(err);
      setMessage("Server error during registration.");
    }
  }

  // Login
  async function handleLogin() {
    if (!username || emojiPin.length === 0) {
      setMessage("Please enter a username and pick emojis.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          pin: emojiPin.join("")
        })
      });
      const data = await res.json();
      setMessage(data.message || "Login failed.");
      setEmojiPin([]);
      setShuffled(shuffleArray(myEmojis));
    } catch (err) {
      console.error(err);
      setMessage("Server error during login.");
    }
  }

  return (
    <div style={{ margin: "20px" }}>
      <h2>Emoji Password (Shuffled and Different Style)</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <p>Select your PIN:</p>
      <div className="iphone-grid">
        {topNine.map((emoji, i) => (
          <button
            key={i}
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

export default CenteredLastRowVariant;
