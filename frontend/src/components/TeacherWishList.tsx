import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface Theme {
  id: string
  title: string
  description: string
  specialty: string
}

export function TeacherWishList() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [maxSelections, setMaxSelections] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch themes from API
    // For now, we'll use mock data
    setThemes([
      { id: '1', title: 'AI in Healthcare', description: 'Applying AI to improve healthcare outcomes', specialty: 'IA' },
      { id: '2', title: 'Blockchain for Supply Chain', description: 'Using blockchain to enhance supply chain transparency', specialty: 'GL' },
      { id: '3', title: 'IoT Smart Home', description: 'Developing IoT solutions for smart homes', specialty: 'RSD' },
    ])

    // Calculate max selections (this should come from an API in a real scenario)
    setMaxSelections(2)
  }, [])

  const handleThemeSelection = (themeId: string) => {
    setSelectedThemes(prev => {
      if (prev.includes(themeId)) {
        return prev.filter(id => id !== themeId)
      } else if (prev.length < maxSelections) {
        return [...prev, themeId]
      } else {
        toast({
          title: "Maximum selections reached",
          description: `You can only select up to ${maxSelections} themes.`,
          variant: "destructive",
        })
        return prev
      }
    })
  }

  const handleSubmit = () => {
    // Submit selected themes to API
    console.log('Selected themes:', selectedThemes)
    toast({
      title: "Wish list submitted",
      description: "Your theme selections have been submitted successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Selection (Wish List)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label>Remaining selections: {maxSelections - selectedThemes.length}</Label>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Select</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Specialty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map((theme) => (
              <TableRow key={theme.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedThemes.includes(theme.id)}
                    onCheckedChange={() => handleThemeSelection(theme.id)}
                  />
                </TableCell>
                <TableCell>{theme.title}</TableCell>
                <TableCell>{theme.description}</TableCell>
                <TableCell>{theme.specialty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleSubmit} className="mt-4">Submit Wish List</Button>
      </CardContent>
    </Card>
  )
}

