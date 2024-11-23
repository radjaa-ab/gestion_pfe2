import React from 'react'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <SidebarTrigger className="md:hidden mr-2" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-64 pl-10 pr-4 rounded-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="ml-4">
              <Bell className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

