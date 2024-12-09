import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface GradeCriteria {
  name: string
  weight: number
}

export function GradeEntry() {
  const [criteria] = useState<GradeCriteria[]>([
    { name: "Report", weight: 30 },
    { name: "Presentation", weight: 30 },
    { name: "Content", weight: 20 },
    { name: "Q&A", weight: 20 },
  ])
  const [grades, setGrades] = useState<{[key: string]: number}>({})
  const { toast } = useToast()

  const handleGradeChange = (criteriaName: string, value: string) => {
    const numValue = parseFloat(value)
    if (isNaN(numValue) || numValue < 0 || numValue > 20) {
      toast({
        title: "Invalid Grade",
        description: "Grade must be a number between 0 and 20.",
        variant: "destructive",
      })
      return
    }
    setGrades({...grades, [criteriaName]: numValue})
  }

  const calculateFinalGrade = () => {
    let finalGrade = 0
    for (let criterion of criteria) {
      finalGrade += (grades[criterion.name] || 0) * (criterion.weight / 100)
    }
    return finalGrade.toFixed(2)
  }

  const handleSubmit = () => {
    if (Object.keys(grades).length !== criteria.length) {
      toast({
        title: "Incomplete Grades",
        description: "Please enter grades for all criteria.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Grades Submitted",
      description: `Final grade: ${calculateFinalGrade()}/20`,
    })
    // Here you would typically send the grades to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Entry</CardTitle>
      </CardHeader>
      <CardContent>
        {criteria.map((criterion) => (
          <div key={criterion.name} className="mb-4">
            <Label htmlFor={criterion.name}>{criterion.name} (Weight: {criterion.weight}%)</Label>
            <Input
              id={criterion.name}
              type="number"
              min="0"
              max="20"
              step="0.1"
              onChange={(e) => handleGradeChange(criterion.name, e.target.value)}
            />
          </div>
        ))}
        <Button onClick={handleSubmit}>Submit Grades</Button>
      </CardContent>
    </Card>
  )
}

