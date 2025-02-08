import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Cookies from "js-cookie";
import logo from "../images/logo.jpeg";
import { useNavigate } from "react-router-dom";

const Header = ({ headerContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const jwtToken = Cookies.get("jwtToken");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
        <div className="flex flex-row items-center gap-x-6">
          <img
            src={logo}
            alt="Logo"
            style={{
              background: "white",
              height: "70px",
              borderRadius: "50%",
            }}
          />
          <a href="/" className="text-2xl font-bold text-red-600">
            ALUMNICONNECT
          </a>
        </div>

        {/* Desktop Menu */}

        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {headerContent.map((item) => (
            <a href={item.link} className="hover:text-red-400">
              {item.title}
            </a>
          ))}
        </nav>

        {/* Login Button */}
        {jwtToken ? (
          <button
            onClick={handleLogout}
            className="hidden md:inline-block bg-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="hidden md:inline-block bg-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-300"
          >
            Login
          </a>
        )}
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <XIcon className="h-6 w-6 text-white" />
            ) : (
              <MenuIcon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 text-white">
          <nav className="flex flex-col space-y-4 p-4">
            {headerContent.map((item) => (
              <a href={item.link} className="hover:text-red-400">
                {item.title}
              </a>
            ))}
            <a
              href="/login"
              className="bg-red-600 px-4 py-2 mt-2 text-center rounded-md font-semibold hover:bg-red-700 transition duration-300"
            >
              Login
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
