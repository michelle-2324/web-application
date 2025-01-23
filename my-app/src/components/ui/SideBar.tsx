"use client";

import { SideBarItems, SideBarItem } from "./SideBarItem";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from 'next/navigation';
import { FileQuestion } from 'lucide-react';

export function Sidebar() {
  const sideBarItems = SideBarItems();
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/');

  return (
    <nav className="w-64 h-screen bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        {isAdminPage ? (
          <li key='/admin/contactRequest' className="flex items-center space-x-2">
            <FileQuestion className="w-5 h-5 mr-3 inline-block" />
            <a href='/admin/contactRequest'>Request from Clients</a>
          </li>
        ) : (
          sideBarItems.map((item: SideBarItem) => (
            <li key={item.page} className="flex items-center space-x-2">
              <item.icon className="w-5 h-5 mr-3 inline-block" />
              <a href={item.page}>{item.label}</a>
            </li>
          ))
        )}
      </ul>
      <div className="mt-4">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}