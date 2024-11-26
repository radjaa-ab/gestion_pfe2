import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, FileText, Calendar, Settings, MessageSquare, ClipboardList, FileSignature, Upload, CheckSquare } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Home, Users, FileText, Calendar, Settings, MessageSquare, ClipboardList, FileSignature, Upload, CheckSquare
};

type MenuItem = {
  label: string;
  icon: string;
  link: string;
};

type SidebarProps = {
  menuItems: MenuItem[];
};

export function Sidebar({ menuItems }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">PFE Platform</h1>
      </div>
      <nav>
        {menuItems.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <Link key={index} to={item.link} className="flex items-center p-4 hover:bg-gray-100">
              {Icon && <Icon className="mr-2" />}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

