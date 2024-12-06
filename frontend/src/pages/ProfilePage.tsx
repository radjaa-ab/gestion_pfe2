'use client'

import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { FileUpload } from '../components/FileUpload'
import { BookOpen, Briefcase, GraduationCap, Mail, MapPin, School, Clock, Award, Activity, Camera, Home, User, Settings } from 'lucide-react'
import { Layout } from '../components/Layout'
import LoadingPage from '../components/LoadingPage'

const profileMenuItems = [
  { label: "Dashboard", icon: Home, link: "/" },
  { label: "Profile", icon: User, link: "/profile" },
  { label: "Settings", icon: Settings, link: "/settings" },
];

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const [name, setName] = React.useState(user?.name || '')
  const [email, setEmail] = React.useState(user?.email || '')
  const [phone, setPhone] = React.useState('123-456-7890')
  const [location, setLocation] = React.useState('Algiers, Algeria')
  const [profilePic, setProfilePic] = React.useState<string>(
    user?.profilePic || `https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`
  )
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)
  const [completionPercentage] = React.useState(85)

  const stats = [
    { label: 'Current Semester', value: '4th', icon: School },
    { label: 'GPA', value: '3.8', icon: Award },
    { label: 'Completed Projects', value: '12', icon: Activity },
    { label: 'Internships', value: '2', icon: Briefcase },
  ]

  const timeline = [
    {
      date: 'Dec 2023',
      title: 'Project Submission',
      description: 'Submitted final project documentation'
    },
    {
      date: 'Nov 2023',
      title: 'Internship Completion',
      description: 'Completed summer internship at Tech Corp'
    },
    {
      date: 'Oct 2023',
      title: 'Research Paper',
      description: 'Published research paper on AI'
    }
  ]

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('profile_picture', file)
      setProfilePic(URL.createObjectURL(file))
      toast({
        title: 'Profile picture updated',
        description: 'Your profile picture has been updated successfully.',
      })
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload profile picture. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await updateUser({ name, email, profilePic })
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      })
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return <LoadingPage message="Loading profile..." />

  return (
    <Layout menuItems={profileMenuItems}>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <main className="flex-1">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-900 dark:to-blue-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative group">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                      <AvatarImage src={profilePic} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Profile Picture</DialogTitle>
                        </DialogHeader>
                        <FileUpload onFileUpload={handleFileUpload} />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <h1 className="mt-4 text-4xl font-bold text-white">{user.name}</h1>
                  <p className="mt-2 text-xl text-purple-100">{user.role}</p>
                  <div className="mt-4 flex items-center space-x-4 text-purple-100">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{email}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Completion Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-white">Profile Completion</span>
                        <span className="text-sm font-medium text-white">{completionPercentage}%</span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="edit">Edit Profile</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <Card key={index}>
                        <CardContent className="flex items-center p-6">
                          <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900">
                            <stat.icon className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Timeline */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      <div className="space-y-6">
                        {timeline.map((item, index) => (
                          <div key={index} className="flex">
                            <div className="flex flex-col items-center">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900">
                                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                              </div>
                              {index !== timeline.length - 1 && (
                                <div className="w-px h-full bg-gray-200 dark:bg-gray-700" />
                              )}
                            </div>
                            <div className="ml-4 mb-6">
                              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {item.date}
                              </time>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {item.title}
                              </h4>
                              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="edit">
                  <Card>
                    <CardContent className="p-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Enter your phone number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="Enter your location"
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? 'Updating...' : 'Update Profile'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Academic Progress</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Current Semester Progress</span>
                                <span className="text-sm font-medium">75%</span>
                              </div>
                              <Progress value={75} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Project Completion</span>
                                <span className="text-sm font-medium">90%</span>
                              </div>
                              <Progress value={90} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Research Progress</span>
                                <span className="text-sm font-medium">60%</span>
                              </div>
                              <Progress value={60} className="h-2" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { icon: Award, title: "Dean's List", date: '2023' },
                              { icon: GraduationCap, title: 'Academic Excellence', date: '2023' },
                              { icon: BookOpen, title: 'Research Publication', date: '2023' },
                            ].map((achievement, index) => (
                              <Card key={index}>
                                <CardContent className="p-4 flex items-center space-x-4">
                                  <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900">
                                    <achievement.icon className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{achievement.title}</p>
                                    <p className="text-sm text-gray-500">{achievement.date}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
        </main>
      </div>
    </Layout>
  )
}

export default ProfilePage

