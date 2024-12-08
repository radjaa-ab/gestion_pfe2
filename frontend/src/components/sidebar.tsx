"use client"

import React from 'react'
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { LogOut, Moon, Sun, ChevronLeft } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from "@/components/ui/button"

interface SidebarProps {
  menuItems: Array<{
    label: string;
    icon: React.ElementType;
    link: string;
  }>;
}

export function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation()
  const { toggleSidebar } = useSidebar()
  const { theme, toggleTheme } = useTheme()

  return (
    <ShadcnSidebar 
      collapsible="icon" 
      className="fixed left-0 top-16 bottom-0 z-40 border-r w-[220px] group-data-[state=collapsed]:w-[60px] shrink-0 bg-gradient-to-b from-purple-700 to-indigo-900 dark:from-purple-900 dark:to-indigo-950 transition-all duration-300 ease-in-out flex flex-col"
    >
      <SidebarContent className="px-2 py-4 flex-grow overflow-y-auto">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.link} className="mb-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.link}
                    className="w-full justify-start px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 text-sm"
                  >
                    <Link to={item.link} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate group-data-[state=collapsed]:hidden">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" className="hidden group-data-[state=collapsed]:block bg-indigo-800 text-white">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 px-2 py-4 space-y-2 sticky bottom-0 bg-gradient-to-b from-purple-700 to-indigo-900 dark:from-purple-900 dark:to-indigo-950">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          className="w-full justify-start text-white hover:bg-white/10 rounded-lg transition-all duration-200 ease-in-out"
        >
          <ChevronLeft className="h-5 w-5 mr-2 group-data-[state=collapsed]:rotate-180" />
          <span className="group-data-[state=collapsed]:hidden">Collapse</span>
        </Button>
        <Button
          variant="ghost"
          onClick={toggleTheme}
          className="w-full justify-start text-white hover:bg-white/10 rounded-lg transition-all duration-200 ease-in-out"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-5 w-5 mr-2" />
              <span className="group-data-[state=collapsed]:hidden">Light mode</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 mr-2" />
              <span className="group-data-[state=collapsed]:hidden">Dark mode</span>
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10 rounded-lg transition-all duration-200 ease-in-out"
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span className="group-data-[state=collapsed]:hidden">Logout</span>
        </Button>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

