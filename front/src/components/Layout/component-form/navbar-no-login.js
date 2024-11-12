import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'


const navigation_left = [
   
    {name:"login" , link:"/auth" },
    {name:"inscription" , link:"/register" } 


]


export default function NavBarNoLogin() {
    return (
      
              <div className="flex flex-row justify-center gap-x-10">
              {navigation_left.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.link} 
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    {item.name}
                  </Link>
                ))}
              </div>
          
          
      );
}
