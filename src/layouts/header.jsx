import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 p-0 transition-shadow duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)] ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold italic">
          EHR Logic
        </Link>

        {/* Navigation Menu */}
        {isSmallScreen ? (
          <>
            {menuOpen && (
              <div
                className={`absolute top-16 left-0 w-full p-4 transition-transform bg-[var(--bg-primary)] text-[var(--text-primary)]`}
              >
                <ul className="flex flex-col space-y-4">
                  <li>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" onClick={() => setMenuOpen(false)}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" onClick={() => setMenuOpen(false)}>
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <ul className="flex space-x-8">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/compdashboard">Component Dashboard</Link>
            </li>
          </ul>
        )}

        <div className="flex items-center space-x-4">
          {userLoggedIn ? (
            <Link to="/logout">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "var(--btn-bg)",
                  color: "var(--btn-text)",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "var(--btn-hover-bg)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "var(--btn-bg)")
                }
                onClick={() => setUserLoggedIn(false)}
              >
                Logout
              </Button>
            </Link>
          ) : (
            <div className="flex space-x-2">
              <Link to="/signin">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "var(--btn-bg)",
                    color: "var(--btn-text)",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "var(--btn-hover-bg)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "var(--btn-bg)")
                  }
                >
                  Login
                </Button>
              </Link>
            </div>
          )}

          {isSmallScreen && (
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <CloseIcon className="text-[var(--text-primary)]" />
              ) : (
                <MenuIcon className="text-[var(--text-primary)]" />
              )}
            </IconButton>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
