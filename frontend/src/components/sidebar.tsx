"use client"

import React from 'react'
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { LogOut, Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Logo } from './ui/logo'

interface SidebarProps {
  menuItems: Array<{
    label: string;
    icon: React.ElementType;
    link: string;
  }>;
}

export function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation()
  const { state } = useSidebar()
  const { theme, toggleTheme } = useTheme()

  return (
    <ShadcnSidebar 
      collapsible="icon" 
      className="border-r w-[240px] group-data-[state=collapsed]:w-[70px] shrink-0 bg-sidebar"
    >
      <SidebarHeader className="border-b px-2 py-3">
        <div className="flex items-center gap-3 px-2">
          <Logo />
          <h2 className="text-lg font-semibold truncate group-data-[state=collapsed]:hidden">
            PFE Platform
          </h2>
          <SidebarTrigger className="ml-auto hidden group-data-[state=expanded]:block" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.link}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.link}
                    className="w-full justify-start px-2"
                  >
                    <Link to={item.link} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate group-data-[state=collapsed]:hidden">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" className="hidden group-data-[state=collapsed]:block">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t mt-auto">
        <div className="p-2 flex flex-col gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start px-2"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 mr-3" />
                    <span className="group-data-[state=collapsed]:hidden">Light mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-3" />
                    <span className="group-data-[state=collapsed]:hidden">Dark mode</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden group-data-[state=collapsed]:block">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start px-2"
              >
                <LogOut className="h-4 w-4 mr-3" />
                <span className="group-data-[state=collapsed]:hidden">Logout</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden group-data-[state=collapsed]:block">
              Logout
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="hidden w-full group-data-[state=collapsed]:flex px-2 h-9 items-center justify-start" />
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden group-data-[state=collapsed]:block">
              Toggle sidebar
            </TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

