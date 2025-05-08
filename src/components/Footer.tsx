"use client";

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-pink-100 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-pink-700">
          <p className="mb-2">✨ CRUD App con diseño femenino ✨</p>
          <p className="text-sm text-pink-400">&copy; {new Date().getFullYear()} Mi Colección</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
