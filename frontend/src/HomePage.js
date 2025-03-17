// src/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: "20px" }}>
      <h1>Emoji Password</h1>
      <p>Choose one of the variants to begin:</p>

     

      <button onClick={() => navigate("/variantA")}>
        Variant A
      </button>

      <button onClick={() => navigate("/variantB")} style={{ marginLeft: "10px" }}>
        Variant B
      </button>

      <button onClick={() => navigate("/variantC")} style={{ marginLeft: "10px" }}>
        Variant C
      </button>
    </div>
  );
}

export default HomePage;
