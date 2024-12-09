import { Bell, User, Home, Settings, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/hooks/useAuth'
import { Logo } from './ui/logo'
import { Link } from "react-router-dom";

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-purple-700 to-indigo-900 dark:from-purple-900 dark:to-indigo-950">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-2 mr-auto">
          <Logo className="w-8 h-8 text-white" />
          <span className="text-white text-xl font-semibold">PFE Platform</span>
        </div>
        <div className="flex-1 flex justify-center">
          <Input
            placeholder="Search..."
            className="w-full max-w-md bg-white/10 border-0 text-white placeholder:text-gray-300 focus:bg-white/20 focus:text-white transition-all duration-200 ease-in-out rounded-full"
          />
        </div>
        <div className="flex items-center space-x-4">
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
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 bg-indigo-800 dark:bg-indigo-950 text-white border border-indigo-600" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-sm text-indigo-300">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
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
              <DropdownMenuItem onSelect={logout} className="hover:bg-indigo-700 focus:bg-indigo-700">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

