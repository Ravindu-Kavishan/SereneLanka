import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <div>
      <Header />
      <main
        className="p-6 bg-black min-h-screen"
        // style={{
        //   backgroundImage: `url(${background})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Help Center
        </h1>
        <p className="text-center text-white mb-6 text-lg">
          Welcome to the Help Center! Here you can find guidance on how to use
          our RAG-based AI chatbot, your hub for tourism in Sri Lanka.
        </p>
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-white/10 backdrop-blur-lg shadow-md rounded-lg p-6  w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4 text-white">
              How to Use the Chatbot?
            </h2>
            <p className="text-white mb-4">
              Simply type your question about tourism in Sri Lanka, and the
              chatbot will provide answers. You can ask about:
            </p>
            <ul className="list-disc pl-6 text-white">
              <li>Top tourist destinations</li>
              <li>Hotels and accommodations</li>
              <li>Transportation options</li>
              <li>Cultural sites and activities</li>
              <li>Map URLs</li>
              <li>Useful contact nombers</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg shadow-md rounded-lg p-6  w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4 text-white">FAQs</h2>
            <ul className="list-disc pl-6 text-white">
              <li>
                How accurate is the chatbot? – The AI is designed to provide
                reliable information based on our knowledge base.
              </li>
              <li>
                Can I save my chats? – Yes, you can save your chats for future
                reference.
              </li>
              <li>
                How do I report an issue? – Use the contact form at the bottom
                of this page.
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg shadow-md rounded-lg p-6  w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4 text-white">Useful Links</h2>
            <ul className="text-blue-600 space-y-2">
              <li>
                <Link to="/savedChat" className="text-white underline">
                  View Saved Chats
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-white underline">
                  Start a New Chat
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg shadow-md rounded-lg p-6  w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4 text-white">Contact Us</h2>
            <p className="text-white mb-4">
              If you need further assistance, feel free to reach out to us:
            </p>
            <p className="text-white font-semibold">
              Email: support@srilankatourism.ai
            </p>
            <p className="text-white font-semibold">Phone: +94-123-456-789</p>
          </div>
        </div>
      </main>
    </div>
  );
}
