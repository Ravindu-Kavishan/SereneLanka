import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Erroemsg from "../components/Erroemsg";

export default function Forgetpassword() {
  const [Username, setUsername] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        "https://serenelankabackend.onrender.com/auth/forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: Username }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        setError(errorMessage);
        return;
      }

      const data = await response.json();
      console.log("User found successfully:", data);
      const dataToSend = {
        username: Username,
        email: Username,
      };
      navigate("/ConfirmPassword", { state: dataToSend });
      setUsername("");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error during finding user:", error);
    }
  };

  return (
    <div className="bg-black h-screen flex items-center justify-center relative">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-4/12">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Serene Lanka</h1>
        </div>
        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Forgotten Password
        </h2>
        {error && <Erroemsg message={error} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>

        <div className="text-center text-sm text-white mt-4">
          Don't have an account?{" "}
          <Link to="/SignIn" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
