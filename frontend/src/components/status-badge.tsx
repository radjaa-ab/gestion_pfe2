import { Badge } from "@/components/ui/badge"

type StatusBadgeProps = {
  status: 'validated' | 'rejected' | 'pending' | 'Not Started' | 'changes_requested' | 'Pending Approval' | 'Project Updated' | 'Approved' | 'Pending Changes' | 'In Progress' | 'Completed';
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap: Record<StatusBadgeProps['status'], string> = {
    validated: "bg-green-500",
    rejected: "bg-red-500",
    pending: "bg-yellow-500",
    "Not Started": "bg-gray-500",
    changes_requested: "bg-orange-500",
    "Pending Approval": "bg-blue-500",
    "Project Updated": "bg-purple-500",
    "Approved": "bg-green-500",
    "Pending Changes": "bg-orange-500",
    "In Progress": "bg-blue-500",
    "Completed": "bg-green-500",
  };

  return (
    <Badge className={`${colorMap[status]} text-white`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

