import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TypeIcon as type, LucideIcon } from 'lucide-react';

interface SidebarProps {
  menuItems: {
    label: string;
    icon: LucideIcon;
    link: string;
  }[];
}

export function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="w-64 h-full bg-blue-700 flex flex-col">
      <ScrollArea className="flex-grow">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold text-white">
              Menu
            </h2>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.link}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white hover:bg-blue-600",
                    location.pathname === item.link && "bg-blue-600"
                  )}
                  asChild
                >
                  <Link to={item.link}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

