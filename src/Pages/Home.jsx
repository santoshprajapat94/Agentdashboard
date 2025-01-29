import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts";
import { Button, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import adminImage from "../assets/images/admini.jpg";
import adminImage1 from "../assets/images/teacher.jpg";

import adminImage2 from "../assets/images/student1.jpg";
import adminImage3 from "../assets/images/student.jpg";
import adminImage4 from "../assets/images/s2.jpg";
import adminImage5 from "../assets/images/s3.jpg";
import adminImage6 from "../assets/images/s4.jpg";
import adminImage7 from "../assets/images/s5.jpg";
import adminImage8 from "../assets/images/s6.jpg";
import adminImage9 from "../assets/images/s7.jpg";
import Loading from "../components/Loding";


const Home = () => {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000); 

  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <>
    <Loading  isLoading={loading}/>
    <Layout>
      {/* Hero Section */}
      <section className=" min-h-screen flex flex-col items-center justify-center text-center py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <h1 className="text-7xl md:text-5xl sm:text-3xl font-extrabold tracking-wide mb-6">
          Empower Your Business with AI Agent
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Build vertical AI Agents for all businesses in minutes instead of months. Simplify operations, enhance decision-making, and unlock new potentials with AI-driven solutions.
        </p>
        <div className="flex gap-6">
          <a
            href="/dashboard"
            className="bg-white text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="border-2 border-white text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-900 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-8">Why Choose Our AI Agent?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Fast Deployment</h3>
            <p className="text-gray-400">Get your business running with AI agents in a fraction of the time compared to traditional development methods.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Cost-Effective</h3>
            <p className="text-gray-400">Reduce operational costs by automating tasks, enhancing efficiency, and optimizing decision-making processes.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Scalable Solutions</h3>
            <p className="text-gray-400">Our AI agents scale with your business, adapting to changing needs and growing as your company expands.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black text-center text-white">
        <h2 className="text-4xl font-extrabold mb-8">What Our Clients Say</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <p className="text-lg text-gray-300 mb-4">"This AI-powered platform has transformed the way we manage operations. Our efficiency has skyrocketed!"</p>
            <p className="font-semibold text-white">John Doe, CEO of Tech Solutions</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <p className="text-lg text-gray-300 mb-4">"The integration was seamless, and the AI agent is doing wonders in automating tasks we never thought possible."</p>
            <p className="font-semibold text-white">Jane Smith, Operations Manager at Innovate Inc.</p>
          </div>
        </div>
      </section>

    </Layout>
    </>
    
  );
};

export default Home;
