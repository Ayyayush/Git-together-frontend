import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-200">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold tracking-wide">
              Gittogether
            </h2>
            <p className="text-sm text-gray-500">
              Connecting developers, one swipe at a time.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm font-medium">
            <a className="hover:text-primary cursor-pointer">
              About
            </a>
            <a className="hover:text-primary cursor-pointer">
              Privacy
            </a>
            <a className="hover:text-primary cursor-pointer">
              Terms
            </a>
            <a className="hover:text-primary cursor-pointer">
              Contact
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="divider my-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-2">
          <p>
            © {new Date().getFullYear()} Gittogether. All rights reserved.
          </p>
          <p>
            Built with ❤️ for developers
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
