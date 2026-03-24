import React from "react";
import { Link, useLocation } from "react-router";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-3">
        <div className="flex gap-6">
          <Link
            to="/"
            className={`text-sm font-semibold transition ${
              isActive("/")
                ? "text-purple-600 dark:text-purple-400"
                : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            }`}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
