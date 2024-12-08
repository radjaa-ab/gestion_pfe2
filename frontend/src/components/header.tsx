"use client"

import { Link } from "react-router-dom"
import { Bell, Search, User, Settings, Home, Menu } from 'lucide-react'
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

export function Header() {
  const { user, logout } = useAuth()
  const { toggleSidebar } = useSidebar()

  const handleLogout = () => {
    logout()
    // Redirect to login page or show a logout confirmation
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-sidebar">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            <Menu className="h-5 w-5 text-sidebar-foreground" />
          </Button>
          <Link to="/" className="flex items-center font-bold text-xl text-sidebar-foreground">
            PFE Platform
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <form className="w-[300px]" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 w-full bg-white/10 border-0 text-sidebar-foreground placeholder:text-sidebar-foreground/60 focus:bg-white focus:text-foreground"
              />
            </div>
          </form>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-sidebar-foreground hover:bg-sidebar-hover"
            asChild
          >
            <Link to={`/${user?.role}/notifications`}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                17
              </span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profilePic} alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/${user?.role}`} className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/${user?.role}/settings`} className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                <span className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
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

