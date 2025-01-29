import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { data } from "../firebase/Firebase";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../layouts/Index";
import { toast } from "react-toastify";

const auth = getAuth(data);

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      toast.error("GitHub login failed: " + error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error logging in: " + error.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row bg-gray-900 text-white">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center lg:w-1/2 px-6 lg:px-16">
          <h1 className="text-4xl lg:text-6xl font-bold mt-12 text-center italic">
            Welcome Back to ViteFire
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-center p-4">
            ViteFire empowers students, teachers, and management with efficient tools and seamless experiences.
            Log in to access your personalized dashboard and explore more!
          </p>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center lg:w-1/2 bg-gray-900 p-6 lg:p-12">
          <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-indigo-500 mb-8">
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email ID
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        style: { backgroundColor: "#fff" },
                      }}
                    />
                  )}
                />
              </div>

              {/* Password Input with Show/Hide functionality */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        style: { backgroundColor: "#fff" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Login
                </Button>
              </div>

              {/* Google Login Button */}
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50"
                  onClick={handleGoogleLogin}
                >
                  Sign In with Google
                </Button>
              </div>

              {/* GitHub Login Button */}
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  className="border-gray-700 text-gray-700 hover:bg-gray-100"
                  onClick={handleGitHubLogin}
                >
                  Sign In with GitHub
                </Button>
              </div>

              {/* Link to redirect to create account */}
              <div className="text-center">
                <Button
                  variant="text"
                  onClick={() => navigate("/account")}
                  className="text-indigo-500 hover:underline"
                >
                  Don't have an account? Create New Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
