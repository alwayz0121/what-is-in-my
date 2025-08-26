import { Link } from "react-router"
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { AlertTriangle, MapPin } from "lucide-react"

interface ExpiringItemCardProps {
  id: string
  name: string
  storageId: string
  storageName: string
  expiryDate: string
  daysLeft: number
  category: string
}

export function ExpiringItemCard({ id, name, storageId, storageName, daysLeft, category }: ExpiringItemCardProps) {
  return (
    <Link to={`/storage/${storageId}/item/${id}`}>
      <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex-1">
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-muted-foreground">{storageName}</div>
        </div>
        <div className="text-right">
          <Badge variant={daysLeft <= 1 ? "destructive" : "secondary"} className="text-xs">
            {daysLeft}일 남음
          </Badge>
        </div>
      </div>
    </Link>
  )
}
