import { Badge } from "~/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle } from "lucide-react"

interface ExpiryBadgeProps {
  expiryDate: string
  showIcon?: boolean
  className?: string
}

export function ExpiryBadge({ expiryDate, showIcon = false, className }: ExpiryBadgeProps) {
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getExpiryStatus = (daysLeft: number) => {
    if (daysLeft < 0)
      return {
        variant: "destructive" as const,
        text: "만료됨",
        icon: AlertTriangle,
      }
    if (daysLeft <= 1)
      return {
        variant: "destructive" as const,
        text: `${daysLeft}일 남음`,
        icon: AlertTriangle,
      }
    if (daysLeft <= 3)
      return {
        variant: "secondary" as const,
        text: `${daysLeft}일 남음`,
        icon: Clock,
      }
    return {
      variant: "outline" as const,
      text: `${daysLeft}일 남음`,
      icon: CheckCircle,
    }
  }

  const daysLeft = getDaysUntilExpiry(expiryDate)
  const status = getExpiryStatus(daysLeft)
  const Icon = status.icon

  return (
    <Badge variant={status.variant} className={className}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {status.text}
    </Badge>
  )
}
