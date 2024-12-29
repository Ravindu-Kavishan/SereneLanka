import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for active state highlighting
import logo from "../images/flight.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-800 text-white shadow-md border-b-4 border-yellow-500">
      <div className="flex p-4 justify-between max-w-6xl items-center mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold flex text-yellow-500">
          <img src={logo} className="w-6 mr-4" />
          Serene Lanka
        </div>

        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <NavLink
            to="/chatbot"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium"
                : "hover:text-blue-400 transition duration-300"
            }
          >
            Chat Bot
          </NavLink>
          <NavLink
            to="/savedchat"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium"
                : "hover:text-blue-400 transition duration-300"
            }
          >
            Saved Chats
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-medium"
                : "hover:text-blue-400 transition duration-300"
            }
          >
            Help
          </NavLink>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-16 right-0 bg-slate-800 w-full shadow-md z-10">
            <div className="flex flex-col space-y-4 px-6 py-4">
              <NavLink
                to="/chatbot"
                onClick={toggleMenu} // Close menu on link click
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 font-medium"
                    : "hover:text-blue-400 transition duration-300"
                }
              >
                Chat Bot
              </NavLink>
              <NavLink
                to="/savedchat"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 font-medium"
                    : "hover:text-blue-400 transition duration-300"
                }
              >
                Saved Chats
              </NavLink>
              <NavLink
                to="/favouritePath"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 font-medium"
                    : "hover:text-blue-400 transition duration-300"
                }
              >
                Favourite Path
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
