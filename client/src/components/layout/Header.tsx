import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaBars, FaShoppingCart, FaFutbol } from "react-icons/fa";
import { getCurrentDate } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  const isActive = (path: string) => {
    return location === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-serie-navy text-white">
      {/* Top bar with auth and social */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-sm">
          <span>{getCurrentDate()}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-white hover:text-serie-light-blue transition">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-serie-light-blue transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-serie-light-blue transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-white hover:text-serie-light-blue transition">
              <FaYoutube />
            </a>
          </div>
          <div className="border-l pl-4">
            <a href="#" className="text-sm hover:text-serie-light-blue transition">
              Sign In
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="text-sm hover:text-serie-light-blue transition">
              Register
            </a>
          </div>
        </div>
      </div>

      {/* Main header with logo and navigation */}
      <div className="bg-gradient-to-r from-serie-navy to-serie-blue">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo */}
            <div className="flex items-center mb-4 md:mb-0">
              <Link href="/" className="text-3xl font-bold font-heading flex flex-wrap items-center">
                <div className="mr-3 soccer-ball-hover">
                  <FaFutbol className="text-white text-3xl drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] soccer-ball-spin" />
                </div>
                <div className="flex items-center">
                  <span 
                    className="text-serie-light-blue text-2xl md:text-4xl tracking-wider whitespace-nowrap" 
                    style={{ 
                      textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 2px 5px rgba(0,0,0,0.5)',
                      letterSpacing: '0.05em'
                    }}
                  >
                    SERIE A
                  </span>
                  <span 
                    className="ml-2 md:ml-4 text-white text-2xl md:text-4xl tracking-wider whitespace-nowrap" 
                    style={{ 
                      textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 2px 5px rgba(0,0,0,0.5)',
                      letterSpacing: '0.05em'
                    }}
                  >
                    INSIDER
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex md:flex-row items-center">
              {/* Main Navigation - Desktop */}
              <nav className="hidden md:block">
                <ul className="flex space-x-6 font-accent font-semibold">
                  <li>
                    <Link
                      href="/"
                      className={`text-white hover:text-serie-light-blue transition py-2 border-b-2 ${
                        isActive("/") ? "border-serie-light-blue" : "border-transparent hover:border-serie-light-blue"
                      }`}
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teams"
                      className={`text-white hover:text-serie-light-blue transition py-2 border-b-2 ${
                        isActive("/teams") ? "border-serie-light-blue" : "border-transparent hover:border-serie-light-blue"
                      }`}
                    >
                      TEAMS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className={`text-white hover:text-serie-light-blue transition py-2 border-b-2 ${
                        isActive("/news") ? "border-serie-light-blue" : "border-transparent hover:border-serie-light-blue"
                      }`}
                    >
                      NEWS & ANALYSIS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      className={`text-white hover:text-serie-light-blue transition py-2 border-b-2 ${
                        isActive("/shop") ? "border-serie-light-blue" : "border-transparent hover:border-serie-light-blue"
                      }`}
                    >
                      MERCH STORE
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/media"
                      className={`text-white hover:text-serie-light-blue transition py-2 border-b-2 ${
                        isActive("/media") ? "border-serie-light-blue" : "border-transparent hover:border-serie-light-blue"
                      }`}
                    >
                      MEDIA
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/fan-zone"
                      className={`text-white hover:text-serie-light-blue transition py-2 border-b-2 ${
                        isActive("/fan-zone") ? "border-serie-light-blue" : "border-transparent hover:border-serie-light-blue"
                      }`}
                    >
                      QUIZ & GAMES
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/newsletter"
                      className={`text-white hover:text-serie-light-blue transition py-2 border-b-2 ${
                        isActive("/newsletter") ? "border-serie-light-blue" : "border-transparent hover:border-serie-light-blue"
                      }`}
                    >
                      NEWSLETTER
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className={`text-white hover:text-serie-light-blue transition py-2 border-b-2 ${
                        isActive("/contact") ? "border-serie-light-blue" : "border-transparent hover:border-serie-light-blue"
                      }`}
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </nav>
              
              {/* Cart Button (Desktop) */}
              <div className="hidden md:block ml-8">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-white hover:text-serie-light-blue transition"
                  aria-label="Open cart"
                >
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-serie-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile menu toggle and cart */}
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-white hover:text-serie-light-blue transition"
                  aria-label="Open cart"
                >
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-serie-red text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                <button
                  type="button"
                  className="text-white hover:text-serie-light-blue focus:outline-none"
                  onClick={toggleMobileMenu}
                >
                  <FaBars className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`md:hidden bg-serie-blue ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <nav className="container mx-auto px-4 py-4">
          <ul className="space-y-3 font-accent font-semibold">
            <li>
              <Link
                href="/"
                className="block text-white hover:text-serie-light-blue transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/teams"
                className="block text-white hover:text-serie-light-blue transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TEAMS
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="block text-white hover:text-serie-light-blue transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NEWS & ANALYSIS
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="block text-white hover:text-serie-light-blue transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                MERCH STORE
              </Link>
            </li>
            <li>
              <Link
                href="/media"
                className="block text-white hover:text-serie-light-blue transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                MEDIA
              </Link>
            </li>
            <li>
              <Link
                href="/fan-zone"
                className="block text-white hover:text-serie-light-blue transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                QUIZ & GAMES
              </Link>
            </li>
            <li>
              <Link
                href="/newsletter"
                className="block text-white hover:text-serie-light-blue transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NEWSLETTER
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block text-white hover:text-serie-light-blue transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;