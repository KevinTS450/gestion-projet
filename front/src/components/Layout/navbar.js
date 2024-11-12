import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { serviceConfig } from "../../config/Service.config";
import NavBarWithLogin from './component-form/navbar-with-login';
import NavBarNoLogin from './component-form/navbar-no-login';



export default function NavBar() {

  const [autorization,setAuthorization]=useState('')

useEffect(()=> {

Getautorization()
},[autorization])

const Getautorization = () => {

  setAuthorization(serviceConfig.getToken())

}


    return (
        <nav className="bg-gray-800 text-white shadow-md border border-gray-600">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Left-aligned items */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              {/* Centered title */}
              <div className="flex flex-row">
                <div className="flex-shrink-0">
                  <Link to="/" className="text-2xl font-bold">Gestion de projet</Link>
                </div>
              </div>
             
              {autorization && !serviceConfig.isTokenExpired() ? <NavBarWithLogin /> : <NavBarNoLogin />}
              
            </div>
          </div>
          {/* Mobile menu */}
          <div className="sm:hidden">
            {/* Mobile menu items */}
          </div>
        </nav>
      );
}
