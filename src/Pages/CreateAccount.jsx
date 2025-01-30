import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { data } from "../firebase/Firebase";
import Layout from "../layouts/Index";

const auth = getAuth(data);

// Yup validation schema
const schema = yup.object({
  full_name: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const CreateAccount = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Account successfully created!");
      reset();
    } catch (error) {
      toast.error("Error creating account: " + error.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row bg-gray-900 text-white min-h-screen">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center lg:w-1/2 px-6 lg:px-16">
          <h1 className="text-4xl lg:text-6xl font-bold mt-12 text-center italic">
            Welcome to ViteFire
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed text-center p-4">
            ViteFire empowers students, teachers, and management with innovative tools and seamless experiences.
            Create an account to start your journey with us!
          </p>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center lg:w-1/2 bg-gray-900 p-6 lg:p-12">
          <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-indigo-500 mb-8">
              Create an Account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Input */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium">
                  Full Name
                </label>
                <Controller
                  name="full_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={!!errors.full_name}
                      helperText={errors.full_name?.message}
                      InputProps={{
                        style: { backgroundColor: "#fff" },
                      }}
                    />
                  )}
                />
              </div>

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
                <label htmlFor="password" className="block text-sm font-medium">
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
                      type={showPassword ? "text" : "password"}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        style: { backgroundColor: "#fff" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
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
                  Create Account
                </Button>
              </div>

              {/* Link to redirect to login */}
              <div className="text-center">
                <Button
                  variant="text"
                  onClick={() => navigate("/login")}
                  className="text-indigo-500 hover:underline"
                >
                  Already have an account? Login here
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
