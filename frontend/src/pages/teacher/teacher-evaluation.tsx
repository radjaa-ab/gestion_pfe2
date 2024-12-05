//import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherEvaluation() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Teacher Evaluation</h2>
      <Card>
        <CardHeader>
          <CardTitle>Evaluate Teacher</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacher-name">Teacher Name</Label>
              <Input id="teacher-name" placeholder="Enter teacher's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-name">Course Name</Label>
              <Input id="course-name" placeholder="Enter course name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teaching-quality">Teaching Quality</Label>
              <Select>
                <SelectTrigger id="teaching-quality">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Excellent</SelectItem>
                  <SelectItem value="4">Very Good</SelectItem>
                  <SelectItem value="3">Good</SelectItem>
                  <SelectItem value="2">Fair</SelectItem>
                  <SelectItem value="1">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Additional Feedback</Label>
              <Textarea id="feedback" placeholder="Provide additional feedback..." />
            </div>
            <Button type="submit">Submit Evaluation</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

