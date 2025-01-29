import React from "react";
import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-primary)] text-gray-400">
      <Box className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <Typography
          variant="h6"
          className="text-white font-semibold text-lg mb-4 md:mb-0"
        >
          ViteFire
        </Typography>

        <Box className="flex gap-6">
          <MuiLink
            href="/about"
            underline="none"
            className="text-gray-400 hover:text-white"
          >
            About Us
          </MuiLink>
          <MuiLink
            href="/contact"
            underline="none"
            className="text-gray-400 hover:text-white"
          >
            Contact
          </MuiLink>
          <MuiLink
            href="/privacy"
            underline="none"
            className="text-gray-400 hover:text-white"
          >
            Privacy Policy
          </MuiLink>
        </Box>
      </Box>

      {/* Divider */}
      <Divider className="bg-gray-700 my-4" />

      {/* Copyright Section */}
      <Box className="text-center py-4">
        <Typography variant="body2">
          © {new Date().getFullYear()} ViteFire. All rights reserved.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
