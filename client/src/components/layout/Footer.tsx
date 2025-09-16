import { Link } from "wouter";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-serie-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="text-2xl font-bold font-heading">
                <span className="text-serie-light-blue">SERIE A</span>
                <span className="ml-2 text-white">INSIDER</span>
              </div>
            </div>
            <p className="text-serie-gray mb-6">
              Your ultimate destination for Serie A news, analysis, and merchandise. Bringing you closer to Italian football since 2020.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-serie-blue flex items-center justify-center hover:bg-serie-light-blue transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-serie-blue flex items-center justify-center hover:bg-serie-light-blue transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-serie-blue flex items-center justify-center hover:bg-serie-light-blue transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-serie-blue flex items-center justify-center hover:bg-serie-light-blue transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-accent font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-serie-gray hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-serie-gray hover:text-white transition">
                  News
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-serie-gray hover:text-white transition">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/fixtures" className="text-serie-gray hover:text-white transition">
                  Fixtures
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-serie-gray hover:text-white transition">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/table" className="text-serie-gray hover:text-white transition">
                  Table
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-accent font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/jerseys" className="text-serie-gray hover:text-white transition">
                  Jerseys
                </Link>
              </li>
              <li>
                <Link href="/shop/training-wear" className="text-serie-gray hover:text-white transition">
                  Training Wear
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="text-serie-gray hover:text-white transition">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop/memorabilia" className="text-serie-gray hover:text-white transition">
                  Memorabilia
                </Link>
              </li>
              <li>
                <Link href="/shop/sale" className="text-serie-gray hover:text-white transition">
                  Sale Items
                </Link>
              </li>
              <li>
                <Link href="/shop/new-arrivals" className="text-serie-gray hover:text-white transition">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-accent font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-serie-gray hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-serie-gray hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-serie-gray hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-serie-gray hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-serie-gray hover:text-white transition">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-serie-gray hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-serie-blue pt-6 text-sm text-serie-gray">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Serie A Insider. All rights reserved. Not affiliated with Lega Serie A.
            </div>
            <div className="flex space-x-4">
              <a href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="/cookie-policy" className="hover:text-white transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
