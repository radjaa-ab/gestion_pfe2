import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/PageContainer"
import { DeadlineOverview } from "@/components/dashboard/DeadlineOverview"
import { StudentOverview } from "@/components/dashboard/StudentOverview"
import { ProjectsComponent } from "@/components/ProjectsComponent"

export default function StudentDashboard() {
  return (
    <PageContainer title="Student Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Welcome back!</h2>
          <div className="flex items-center space-x-2">
            <Button>View Calendar</Button>
          </div>
        </div>

        <Alert>
          <AlertTitle>Reminder</AlertTitle>
          <AlertDescription>
            Your next deadline is approaching: Literature Review due in 7 days.
          </AlertDescription>
        </Alert>

        <StudentOverview />
        <DeadlineOverview />
        <ProjectsComponent />
      </div>
    </PageContainer>
  )
}

