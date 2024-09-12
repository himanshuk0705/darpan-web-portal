"use client";

import { Menu } from 'antd';
import Link from 'next/link';
import { useEffect, useState, SetStateAction } from 'react'; // Correct import here
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Navbar = () => {
  const [current, setCurrent] = useState('home');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setMounted(true); // Set mounted to true when the component is rendered on the client
  }, []);

  const handleClick = (e: { key: SetStateAction<string> }) => {
    setCurrent(e.key);
  };

  // Prevent rendering of the toggle before the theme is loaded
  if (!mounted) {
    return null; // Ensure no rendering before the theme is loaded
  }

  return (
    <nav className="w-full  fixed top-0 left-0 z-50 bg-transparent dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link href="/">
          
          <Image src={theme === 'light' ? "/dn-black.png" : "/dn-white.png"} alt="logo" width={100} height={10} />
         
            
          </Link>
        </div>

        {/* Menu Section */}
        <div className="flex-grow">
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="bg-transparent justify-center border-none text-gray-900 dark:text-white text-lg"
            items={[
              {
                label: <Link href="/">Home</Link>,
                key: 'home',
              },
              {
                label: <Link href="/about">About</Link>,
                key: 'about',
              },
              {
                label: <Link href="/services">Services</Link>,
                key: 'services',
              },
              {
                label: <Link href="/contact">Contact</Link>,
                key: 'contact',
              },
            ]}
          />
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
