import React from "react";
import Layout from "../layouts/Index"; // Assuming you have a Layout component
import MicIcon from "@mui/icons-material/Mic";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 md:px-20 lg:px-36">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">About Us</h1>
          <p className="text-md md:text-lg mt-3">
            Redefining interactions with the power of AI voice technology.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* For Users */}
          <div className="bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="text-center mb-6">
              <MicIcon className="text-blue-500 text-7xl" sx={{ fontSize: 50 }} />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-3">For Users</h2>
            <p className="text-md md:text-base text-center">
              Transforming how users interact with technology through seamless voice commands and 
              intelligent responses. Experience hands-free convenience and smarter conversations.
            </p>
          </div>

          {/* For Developers */}
          <div className="bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="text-center mb-6">
              <SmartToyIcon className="text-green-500 text-7xl" sx={{ fontSize: 50 }} />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-3">For Developers</h2>
            <p className="text-md md:text-base text-center">
              Empowering developers with cutting-edge APIs and tools to integrate AI-powered voice 
              features into their applications, making it easy to build innovative user experiences.
            </p>
          </div>

          {/* For Businesses */}
          <div className="bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="text-center mb-6">
              <SettingsVoiceIcon sx={{ fontSize: 50, color: "#ff9800" }} />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-3">For Businesses</h2>
            <p className="text-md md:text-base text-center">
              Revolutionizing customer engagement with AI-driven voice solutions. Streamline 
              operations, enhance customer satisfaction, and deliver personalized experiences at scale.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
