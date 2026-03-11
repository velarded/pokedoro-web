"use client";

import React from "react";

export default function NavigationBar() {
  return (
    <nav className="relative z-10 px-8 flex justify-between items-center bg-gray-800" style={{ height: '50px' }}>
      {/* Logo */}
      <div>
        <img src="/pokedoro-title.svg" 
          alt="Pokedoro" 
          style={{ height: '40px', width: 'auto' }}
        />
      </div>

      {/* Right Navigation Items */}
      <div className="flex items-center space-x-6">
        <button className="text-white font-semibold text-lg hover:opacity-80 transition-opacity uppercase tracking-wide">
          Settings
        </button>
        <button className="text-white font-semibold text-lg hover:opacity-80 transition-opacity uppercase tracking-wide">
          Login
        </button>
      </div>
    </nav>
  );
}
