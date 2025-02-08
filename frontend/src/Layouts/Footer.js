import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 py-4 mt-10 shadow-inner">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm text-gray-400">
          <div>
            <p>
              &copy; {new Date().getFullYear()} Alumni Association. All rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="/privacy-policy"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="hover:text-gray-200 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
