import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleimg from "../images/google.svg";
import Erroemsg from "../components/Erroemsg";
import getAuthDetails from "../fireBase/firebase.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://serenelankabackend.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        setError(errorMessage);
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);
      setUsername("");
      setPassword("");
      navigate("/chatbot");
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Error during Login:", error);
    }
  };

  const handleGooglelogIn = async () => {
    try {
      const result = await getAuthDetails();
      const user = result?.user;
      if (user) {
        const response = await fetch("https://serenelankabackend.onrender.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.displayName || "Google User",
            email: user.email,
            password: "GoogleAuth",
          }),

          credentials: "include",
        });

        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          setError(errorMessage);
          return;
        }

        const data = await response.json();
        console.log("Login successful:", data);
        navigate("/chatbot");
      } else {
        setError("Google Log-In failed: No user object returned");
        console.error("Google Log-In failed: No user object returned");
      }
    } catch (error) {
      setError("Error with Google Log-In:");
      console.error("Error with Google log-In:", error);
    }
  };

  return (
    <div className="bg-black h-screen flex items-center justify-center relative">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-4/12">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Serene Lanka</h1>
        </div>
        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Login
        </h2>

        {error && <Erroemsg message={error} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full px-4 py-2 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
            />
          </div>
          <div className="text-right mb-6">
            <Link
              to="ForgetPassword"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Log in
          </button>
        </form>
        <div className="text-center my-4 text-white">or continue with</div>
        <div className="flex justify-center mb-6">
          <button
            className="w-20 h-10 rounded-lg bg-white/30 text-white flex items-center justify-center hover:bg-blue-700"
            onClick={handleGooglelogIn}
          >
            <img src={googleimg} alt="Google" />
          </button>
        </div>
        <div className="text-center text-sm text-white">
          Don't have an account?{" "}
          <Link to="/SignIn" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
