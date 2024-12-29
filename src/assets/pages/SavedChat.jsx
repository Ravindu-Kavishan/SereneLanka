import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import location from "../images/Location.svg";
import gallery from "../images/gallery.svg";
import web from "../images/web.svg";
import deleteicon from "../images/deleteicon.svg";


export default function SavedChat() {
  const [savedChats, setSavedChats] = useState([]); // Initialize as an empty array

  // Fetch saved chats when the component mounts
  useEffect(() => {
    const fetchSavedChats = async () => {
      try {
        const response = await fetch(
          "https://serenelankabackend.onrender.com/chatbot/getSavedChats",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          console.log(`Error: ${response.status} ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setSavedChats(data.chats); // Update to use the `chats` field from the backend response
      } catch (error) {
        console.error("Error fetching saved chats:", error);
      }
    };

    fetchSavedChats();
  }, []);

  // Function to handle deleting a saved chat
  const handleDeleteChat = async (id) => {
    try {
      const response = await fetch(
        `https://serenelankabackend.onrender.com/chatbot/deleteChat/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      // Remove the chat from the UI
      setSavedChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <div>
      <Header />
      <main className="p-6 bg-black min-h-screen text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Saved Chats</h1>
        {savedChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-center text-lg">
              No saved chats available.
            </p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              <Link to="/">Login again</Link>
            </button>
          </div>
        ) : (
          <div className="p-6">
            {savedChats.map((chat) => (
              <div
                key={chat.id}
                className="bg-white/10 backdrop-blur-lg  shadow-md rounded-lg p-4  m-4"
              >
                <h2 className="text-lg font-semibold mb-2">Question:</h2>
                <p className=" mb-4">{chat.question}</p>
                <h3 className="text-lg font-semibold mb-2">Answer:</h3>
                <p className="">{chat.answer}</p>

                {/* Conditional rendering for map URLs */}
                {chat.map_urls && chat.map_urls.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">Map Links:</h4>
                    <ul>
                      {chat.map_urls.map((url, index) => (
                        <li key={index}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" hover:text-yellow-500"
                          >
                            <span className="flex underline">
                              <img src={location} alt="" className="mr-2 w-6 " />
                              View Map {index + 1}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Conditional rendering for image URLs */}
                {chat.image_urls && chat.image_urls.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">Image Links:</h4>
                    <ul>
                      {chat.image_urls.map((url, index) => (
                        <li key={index}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" hover:text-yellow-500"
                          >
                           <span className="flex text-white underline">
                              <img src={gallery} alt="" className="mr-2 w-6 " />
                              View image {index + 1}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {chat.website_urls && chat.website_urls.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold mb-2">
                      website Links:
                    </h4>
                    <ul>
                      {chat.website_urls.map((url, index) => (
                        <li key={index}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" hover:text-yellow-500"
                          >
                            <span className="flex underline">
                              <img src={web} alt="" className="mr-2 w-6 " />
                              website {index + 1}
                            </span>
                            
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className=" px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    <img src={deleteicon} alt="" className="w-8"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
