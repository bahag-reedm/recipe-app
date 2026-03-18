import React from "react";

interface NavbarProps {
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const Navbar: React.FC<NavbarProps> = ({ selectedLetter, onSelectLetter }) => {
  return (
    <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto">
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => onSelectLetter(letter)}
              className={`px-3 py-1 text-sm rounded-full transition whitespace-nowrap
                ${
                  selectedLetter === letter
                    ? "bg-purple-600 text-white shadow"
                    : "text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800"
                }`}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
