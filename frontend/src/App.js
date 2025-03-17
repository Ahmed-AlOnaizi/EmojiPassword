import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";           // New homepage with 3 buttons
import VariantA from "./VariantA";           // The first variant
import VariantB from "./VariantB";           // The second variant
import VariantC from "./VariantC";           // The third variant
import IPhoneLayoutVariant from "./IPhoneLayoutVariant";


import UsernamePage from "./UsernamePage";
import PasscodePage from "./PasscodePage";
import RegisterUsernamePage from "./RegisterUsernamePage";
import SetPasscodePage from "./SetPasscodePage";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/iphone-variant" element={<IPhoneLayoutVariant />} />

        {/* The three variants */}
        <Route path="/variantA" element={<VariantA />} />
        <Route path="/variantB" element={<VariantB />} />
        <Route path="/variantC" element={<VariantC />} />

        
        <Route path="/passcode" element={<PasscodePage />} />
        <Route path="/register" element={<RegisterUsernamePage />} />
        <Route path="/set-passcode" element={<SetPasscodePage />} />
        <Route path="/username" element={<UsernamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
