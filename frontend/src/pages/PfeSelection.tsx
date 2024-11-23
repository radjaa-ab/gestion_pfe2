import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PfeSelectionForm } from '@/components/PfeSelectionForm'

export default function PfeSelection() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>PFE Selection</CardTitle>
          <CardDescription>Fill out the form below to submit your PFE selection.</CardDescription>
        </CardHeader>
        <CardContent>
          <PfeSelectionForm />
        </CardContent>
      </Card>
    </div>
  )
}

