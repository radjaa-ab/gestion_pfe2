import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface ReportSection {
  id: string
  title: string
  content: string
}

export function ReportGenerator() {
  const [reportSections, setReportSections] = useState<ReportSection[]>([
    { id: '1', title: 'Introduction', content: '' },
    { id: '2', title: 'Methodology', content: '' },
    { id: '3', title: 'Results', content: '' },
    { id: '4', title: 'Conclusion', content: '' },
  ])

  const [reportTitle, setReportTitle] = useState("")
  const [reportType, setReportType] = useState("")
  const [includeCharts, setIncludeCharts] = useState(false)

  const { toast } = useToast()

  const handleSectionChange = (id: string, content: string) => {
    setReportSections(reportSections.map(section => 
      section.id === id ? { ...section, content } : section
    ))
  }

  const handleGenerateReport = () => {
    // Here you would typically generate the report based on the input
    // For this example, we'll just show a success message
    toast({
      title: "Report Generated",
      description: "Your report has been generated successfully.",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Report Generator</CardTitle>
        <CardDescription>Create comprehensive project reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reportTitle">Report Title</Label>
            <Input
              id="reportTitle"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              placeholder="Enter report title"
            />
          </div>
          <div>
            <Label htmlFor="reportType">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="progress">Progress Report</SelectItem>
                <SelectItem value="final">Final Report</SelectItem>
                <SelectItem value="summary">Executive Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeCharts"
              checked={includeCharts}
              onCheckedChange={(checked) => setIncludeCharts(checked as boolean)}
            />
            <Label htmlFor="includeCharts">Include charts and diagrams</Label>
          </div>
          {reportSections.map(section => (
            <div key={section.id}>
              <Label htmlFor={`section-${section.id}`}>{section.title}</Label>
              <Textarea
                id={`section-${section.id}`}
                value={section.content}
                onChange={(e) => handleSectionChange(section.id, e.target.value)}
                placeholder={`Enter ${section.title.toLowerCase()} here...`}
              />
            </div>
          ))}
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </div>
      </CardContent>
    </Card>
  )
}

