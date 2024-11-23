import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ResourceRequest() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Resource Request</h2>
      <Card>
        <CardHeader>
          <CardTitle>Request Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resource-name">Resource Name</Label>
              <Input id="resource-name" placeholder="Enter resource name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-description">Resource Description</Label>
              <Textarea id="resource-description" placeholder="Describe the resource..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" placeholder="Enter quantity" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Request</Label>
              <Textarea id="reason" placeholder="Explain why you need this resource..." />
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

