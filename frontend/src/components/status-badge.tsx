import { Badge } from "@/components/ui/badge"

type StatusBadgeProps = {
  status: 'validated' | 'rejected' | 'pending' | 'Not started';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap: Record<StatusBadgeProps['status'], string> = {
    validated: "bg-green-500",
    rejected: "bg-red-500",
    pending: "bg-yellow-500",
    "Not started": "bg-black-500", // Key wrapped in quotes
  }

  return (
    <Badge className={`${colorMap[status]} text-white`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
