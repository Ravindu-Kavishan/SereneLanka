import React, { useState } from "react";
import Header from "../components/Header";

export default function MainChatBot() {
  const [question, setQuestion] = useState(""); // State to track the input value
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading animation

  // Function to handle input change
  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation

    try {
      const response = await fetch("https://serenelankabackend.onrender.com/chatbot/sendPrompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response body
        alert(`Error: - ${errorResponse.detail || "An error occurred."}`);
        return;
      }

      const result = await response.json();

      // Extract the URLs from the response
      const { answer, image_urls, website_urls, map_urls } = result;

      // Update the chat history with the answer
      const userMessage = {
        you: question,
        me: answer,
        image_urls, // Use snake_case
        website_urls, // Use snake_case
        map_urls, // Use snake_case
        isSaved: false,
      };
      setChatHistory([userMessage, ...chatHistory]);

      setQuestion(""); // Clear the input field after submitting
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  // Function to adjust the height of the textarea
  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Function to handle saving and unsaving chat
  const handleChatToggleSave = async (index) => {
    const chat = chatHistory[index];
    console.log("Chat data being sent:", chat); // Debugging line

    if (!chat.isSaved) {
      try {
        const response = await fetch("https://serenelankabackend.onrender.com/chatbot/savechat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: chat.you,
            answer: chat.me,
            image_urls: chat.image_urls || [], // Use snake_case
            website_urls: chat.website_urls || [], // Use snake_case
            map_urls: chat.map_urls || [], // Use snake_case
          }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorResponse = await response.json(); 
          alert(`Error: - ${errorResponse.detail || "An error occurred."}`);
          return;
        }

        const result = await response.json();
        console.log(result.message);
        setChatHistory((prevHistory) =>
          prevHistory.map((item, idx) =>
            idx === index ? { ...item, isSaved: true } : item
          )
        );
      } catch (error) {
        console.error("An error occurred while saving the chat:", error);
      }
    }
  };

  return (
    <div className="bg-black min-h-screen ">
      <Header />
      <div className="flex flex-col items-center justify-between p-4">
        <div className="text-center w-full max-w-4xl">
          <h1 className="text-white text-5xl font-extrabold mb-6">
            Ask about sri Lankan tourism...
          </h1>

          {/* Display the chat history */}
          <div className="p-4 rounded-xl mb-6 flex flex-col-reverse overflow-auto">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className="mb-4 border border-black p-4 rounded-lg bg-white/30"
              >
                {/* Save/Unsave button */}
                <div className="flex justify-start space-x-2">
                  <button
                    onClick={() => handleChatToggleSave(index)} // Pass index to the handler
                    className={`px-3 py-1 rounded-md shadow-md m-4 lg:m-0 ${
                      chat.isSaved
                        ? "bg-gray-500 text-white"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    {chat.isSaved ? "Saved" : "Save"}
                  </button>

                  {/* Conditionally render the Map button */}
                  {/* Conditionally render the Map button */}
                  {chat.map_urls && chat.map_urls.length > 0 && (
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                      onClick={() => window.open(chat.map_urls[0], "_blank")} // Use snake_case
                    >
                      Map
                    </button>
                  )}

                  {/* Conditionally render the Image URL button */}
                  {chat.image_urls && chat.image_urls.length > 0 && (
                    <button
                      className="px-3 py-1 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600"
                      onClick={() => window.open(chat.image_urls[0], "_blank")} // Use snake_case
                    >
                      Image URL
                    </button>
                  )}
                  {chat.website_urls && chat.website_urls.length > 0 && (
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                      onClick={() => window.open(chat.website_urls[0], "_blank")} // Use snake_case
                    >
                      website URL
                    </button>
                  )}
                </div>

                {/* User's message */}
                <div
                  className={`flex ${
                    chat.you ? "justify-end" : "justify-start"
                  }`}
                >
                  {chat.you && (
                    <div className="bg-blue-600 text-white max-w-xs p-3 rounded-3xl mb-2 shadow-lg">
                      {chat.you}
                    </div>
                  )}
                </div>

                {/* Bot's response */}
                <div
                  className={`flex ${
                    chat.me ? "justify-start" : "justify-end"
                  }`}
                >
                  {chat.me && (
                    <div className="bg-green-600 text-white max-w-xs p-3 rounded-3xl mb-2 shadow-lg break-words">
                      {chat.me}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center space-x-4 bg-white/30 p-4 rounded-3xl shadow-lg"
          >
            <textarea
              value={question}
              onChange={handleInputChange}
              placeholder="Type your question..."
              className="w-full p-2 text-white bg-transparent border-2 border-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
