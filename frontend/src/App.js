import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsernamePage from "./UsernamePage"; // your login page, perhaps
import PasscodePage from "./PasscodePage"; // login passcode page
import RegisterUsernamePage from "./RegisterUsernamePage"; // new registration username page
import SetPasscodePage from "./SetPasscodePage"; // new passcode page for registration

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsernamePage />} />
        <Route path="/passcode" element={<PasscodePage />} />
        <Route path="/register" element={<RegisterUsernamePage />} />
        <Route path="/set-passcode" element={<SetPasscodePage />} />
      </Routes>
    </Router>
  );
}

export default App;
