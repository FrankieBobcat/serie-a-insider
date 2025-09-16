import React from 'react';
import { Link, useLocation } from 'wouter';
import { FaHome, FaUsers, FaNewspaper, FaTshirt, FaPlay } from 'react-icons/fa';

const MobileNav: React.FC = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-serie-blue border-t border-serie-light-blue z-50 md:hidden">
      <div className="grid grid-cols-5 py-2">
        <Link href="/">
          <div className="flex flex-col items-center justify-center">
            <FaHome className={`text-xl ${isActive('/') ? 'text-serie-light-blue' : 'text-white'}`} />
            <span className={`text-xs mt-1 ${isActive('/') ? 'text-serie-light-blue' : 'text-white'}`}>Home</span>
          </div>
        </Link>
        <Link href="/teams">
          <div className="flex flex-col items-center justify-center">
            <FaUsers className={`text-xl ${isActive('/teams') ? 'text-serie-light-blue' : 'text-white'}`} />
            <span className={`text-xs mt-1 ${isActive('/teams') ? 'text-serie-light-blue' : 'text-white'}`}>Teams</span>
          </div>
        </Link>
        <Link href="/news">
          <div className="flex flex-col items-center justify-center">
            <FaNewspaper className={`text-xl ${isActive('/news') ? 'text-serie-light-blue' : 'text-white'}`} />
            <span className={`text-xs mt-1 ${isActive('/news') ? 'text-serie-light-blue' : 'text-white'}`}>News</span>
          </div>
        </Link>
        <Link href="/shop">
          <div className="flex flex-col items-center justify-center">
            <FaTshirt className={`text-xl ${isActive('/shop') ? 'text-serie-light-blue' : 'text-white'}`} />
            <span className={`text-xs mt-1 ${isActive('/shop') ? 'text-serie-light-blue' : 'text-white'}`}>Shop</span>
          </div>
        </Link>
        <Link href="/media">
          <div className="flex flex-col items-center justify-center">
            <FaPlay className={`text-xl ${isActive('/media') ? 'text-serie-light-blue' : 'text-white'}`} />
            <span className={`text-xs mt-1 ${isActive('/media') ? 'text-serie-light-blue' : 'text-white'}`}>Media</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;