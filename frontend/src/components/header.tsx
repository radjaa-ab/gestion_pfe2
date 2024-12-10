"use client"

import { Link } from "react-router-dom"
import { Bell, Search, User, Settings, Home, Menu, LogOut } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../hooks/useAuth"
import { useSidebar } from "@/components/ui/sidebar"

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'company';
  profilePic?: string;
}

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  const { logout } = useAuth()
  const { toggleSidebar } = useSidebar()

  const handleLogout = () => {
    logout()
    // Redirect to login page or show a logout confirmation
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-purple-700 to-indigo-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 text-white hover:bg-white/10 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110">
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center font-bold text-2xl text-white hover:text-indigo-200 transition-colors duration-200">
            PFE Platform
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <form className="w-[300px]" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 w-full bg-white/10 border-0 text-white placeholder:text-gray-300 focus:bg-white/20 focus:text-white transition-all duration-200 ease-in-out rounded-full"
              />
            </div>
          </form>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-white/10 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110"
            asChild
          >
            <Link to={`/${user?.role}/notifications`}>
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center animate-pulse">
                17
              </span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10 transition-all duration-200 ease-in-out transform hover:scale-110">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={user?.profilePic} alt={user?.name} />
                  <AvatarFallback className="bg-indigo-600 text-white">{user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 bg-indigo-800 text-white border border-indigo-600" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-indigo-300">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-indigo-600" />
              <DropdownMenuItem asChild className="hover:bg-indigo-700 focus:bg-indigo-700">
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-indigo-700 focus:bg-indigo-700">
                <Link to={`/${user?.role}`} className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-indigo-700 focus:bg-indigo-700">
                <Link to={`/${user?.role}/settings`} className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-indigo-600" />
              <DropdownMenuItem onSelect={handleLogout} className="hover:bg-indigo-700 focus:bg-indigo-700">
                <span className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

