import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login";
import SignIn from "./assets/pages/SignIn";
import Forgetpassword from "./assets/pages/Forgetpassword";
import Confirmpassword from "./assets/pages/ConfirmPassword";
import MainChatBot from "./assets/pages/MainChatBot";
import SavedChat from "./assets/pages/SavedChat";
import Help from "./assets/pages/Help";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/ForgetPassword" element={<Forgetpassword />} />
        <Route path="/ConfirmPassword" element={<Confirmpassword />} />
        <Route path="/chatbot" element={<MainChatBot/>}/> 
        <Route path="/savedchat" element={<SavedChat/>}/> 
        <Route path="/help" element={<Help/>}/> 
      </Routes>
    </BrowserRouter>
  );
}
