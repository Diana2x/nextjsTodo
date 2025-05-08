import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl text-pink-500">✿</span>
            <span className="font-bold text-xl text-purple-800">Mi Colección</span>
          </Link>
          
          <Link 
            href="/items/create"
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm"
          >
            ✨ Crear Nuevo
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
