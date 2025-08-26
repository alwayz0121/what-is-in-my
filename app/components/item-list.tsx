import { Card, CardContent } from "~/components/ui/card"
import { Link } from "react-router"
import { Badge } from "~/components/ui/badge"
import { Package, MapPin, AlertTriangle } from "lucide-react"

interface Item {
  id: string
  name: string
  quantity: number
  unit: string
  expiryDate: string
  category: string
  addedDate: string
}

interface ItemListProps {
  items: Item[]
  storageId: string
  sectionName: string
}

export function ItemList({ items, storageId, sectionName }: ItemListProps) {
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getExpiryStatus = (daysLeft: number) => {
    if (daysLeft < 0) return { variant: "destructive" as const, text: "만료됨" }
    if (daysLeft <= 1) return { variant: "destructive" as const, text: `${daysLeft}일 남음` }
    if (daysLeft <= 3) return { variant: "secondary" as const, text: `${daysLeft}일 남음` }
    return { variant: "outline" as const, text: `${daysLeft}일 남음` }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">아직 물건이 없어요</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const daysLeft = getDaysUntilExpiry(item.expiryDate)
        const expiryStatus = getExpiryStatus(daysLeft)

        return (
          <Link key={item.id} to={`/storage/${storageId}/item/${item.id}`}>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-sm">{item.name}</h5>
                  {daysLeft <= 3 && <AlertTriangle className="h-3 w-3 text-accent" />}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    {item.quantity} {item.unit}
                  </span>
                  <span>•</span>
                  <span>{item.category}</span>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={expiryStatus.variant} className="text-xs mb-1">
                  {expiryStatus.text}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {new Date(item.expiryDate).toLocaleDateString("ko-KR", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
