import { Badge } from "@/components/ui/badge"

type StatusBadgeProps = {
  status: 'validated' | 'rejected' | 'pending';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap = {
    validated: "bg-green-500",
    rejected: "bg-red-500",
    pending: "bg-yellow-500"
  }

  return (
    <Badge className={`${colorMap[status]} text-white`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

