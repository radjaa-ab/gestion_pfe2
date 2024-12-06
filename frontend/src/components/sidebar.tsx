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
      className="w-[200px] group-data-[state=collapsed]:w-[60px]"
    >
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <Logo />
            <h2 className="text-lg font-semibold truncate group-data-[state=collapsed]:hidden">
              PFE Platform
            </h2>
          </Link>
          <SidebarTrigger className="hidden group-data-[state=expanded]:block" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.link}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.link}
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
      <SidebarFooter className="border-t">
        <div className="flex flex-col gap-2 p-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    <span className="group-data-[state=collapsed]:hidden">Light mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
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
                className="w-full justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="group-data-[state=collapsed]:hidden">Logout</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden group-data-[state=collapsed]:block">
              Logout
            </TooltipContent>
          </Tooltip>
          <SidebarTrigger className="hidden group-data-[state=collapsed]:block mt-auto w-full" />
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

