import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./Pages/SignIn";
import { CreateAccount } from "./Pages/CreateAccount";
import Home from "./Pages/Home";
import AboutUs from "./Pages/About";
import Loading from "./components/Loding";
import ProtectedRoute from "./authnatication/ProtectedRoute";
import DashboardComp from "./Pages/ai-voice";

const Dashboard = lazy(() => import("./Pages/dashboard"));

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Example auth logic

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<CreateAccount />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compdashboard" element={<DashboardComp/>}/>

          {/* Protected Routes */}
          {/* <Route
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}

          {/* 404 Fallback */}
          <Route path="*" element={<div className="text-5xl text-red-700 flex align-center justify-center	 mt-72"><span className=" text-8xl font-extrabold	">Page Not Found 4😒4</span></div>} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
      />
    </Router>
  );
};

export default App;
