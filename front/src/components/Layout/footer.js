import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Disclosure as="nav" className="bg-gray-800 text-white shadow-md border-t mt-20 border-gray-600">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-10">
            <div className="relative flex items-center justify-between h-20">
              {/* Left-aligned copyright */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>

              {/* Centered title */}
              <div className="flex-1 flex justify-center">
                <span className="text-lg">Copyright © 2024 Kevin Gestion de projet</span>
              </div>

              {/* Right-aligned links */}
              <div className="hidden sm:flex sm:items-center">
                <Link to="/about" className="px-3 py-2 text-gray-400 hover:text-white">About</Link>
                <Link to="/contact" className="px-3 py-2 text-gray-400 hover:text-white">Contact</Link>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col items-center">
              <Link to="/about" className="block px-4 py-2 text-gray-400 hover:text-white">About</Link>
              <Link to="/contact" className="block px-4 py-2 text-gray-400 hover:text-white">Contact</Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
