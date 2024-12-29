import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleimg from "../images/google.svg";
import getAuthDetails from "../fireBase/firebase.js";
import Erroemsg from "../components/Erroemsg";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password === ConfirmPassword) {
      try {
        const response = await fetch("https://serenelankabackend.onrender.com/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),

          credentials: "include",
        });

        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          setError(errorMessage);
          return;
        }

        const data = await response.json();
        console.log("Signin successful:", data);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/chatbot");
      } catch (error) {
        setError("An error occurred during signin. Please try again.");
        console.error("Error during signin:", error);
      }
    } else {
      setError("Passwords do not match");
      console.error("Passwords do not match");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await getAuthDetails();
      const user = result?.user;
      if (user) {
        const response = await fetch("https://serenelankabackend.onrender.com/auth/signin", {
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
        console.log("Signin successful:", data);
      } else {
        setError("Google Sign-In failed: No user object returned");
        console.error("Google Sign-In failed: No user object returned");
      }
    } catch (error) {
      setError("Error with Google Sign-In:");
      console.error("Error with Google Sign-In:", error);
    }
  };

  return (
    <div className="bg-black h-screen flex items-center justify-center relative">
      

      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-4/12">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Serene Lanka</h1>
        </div>
        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Signin
        </h2>
        {error && <Erroemsg message={error} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full px-4 py-2 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
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
          <div className="mb-4">
            <input
              type="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign in
          </button>
        </form>
        <div className="text-center my-4 text-white">or continue with</div>
        <div className="flex justify-center mb-6">
          <button
            className="w-20 h-10 rounded-lg bg-white/30 text-white flex items-center justify-center hover:bg-blue-700"
            onClick={handleGoogleSignIn}
          >
            <img src={googleimg} alt="Google" />
          </button>
        </div>
        <div className="text-center text-sm text-white">
          Do you have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
