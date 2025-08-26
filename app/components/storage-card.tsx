import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Link } from "react-router"
import { Badge } from "~/components/ui/badge"
import { Package, AlertTriangle, Clock, ChevronRight, Refrigerator, Archive } from "lucide-react"

interface StorageCardProps {
  id: string
  name: string
  type: "refrigerator" | "drawer" | "cabinet" | "other"
  itemCount: number
  expiringCount: number
  lastUpdated: string
  image?: string
}

export function StorageCard({
  id,
  name,
  type,
  itemCount,
  expiringCount,
  lastUpdated,
  image,
}: StorageCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "refrigerator":
        return <Refrigerator className="h-4 w-4" />
      case "drawer":
        return <Archive className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getTypeName = () => {
    switch (type) {
      case "refrigerator":
        return "냉장고"
      case "drawer":
        return "서랍"
      case "cabinet":
        return "수납장"
      default:
        return "기타"
    }
  }

  return (
    <Link to={`/storage/${id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  {getTypeIcon()}
                </div>
                <div>
                  <h3 className="font-medium text-sm truncate">{name}</h3>
                  <p className="text-xs text-muted-foreground">{getTypeName()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span>{itemCount}개 물건</span>
                {expiringCount > 0 && (
                  <span className="text-accent flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {expiringCount}개 임박
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{lastUpdated}</span>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
