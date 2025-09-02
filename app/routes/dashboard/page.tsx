import { Header } from "~/components/header"
import { Navigation } from "~/components/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Package, Plus, Clock, AlertTriangle, Refrigerator, Archive, ChevronRight } from "lucide-react"
import { Link } from "react-router"

// Mock data - 실제로는 API에서 가져올 데이터
const storageList = [
  {
    id: "1",
    name: "주방 냉장고",
    type: "refrigerator",
    itemCount: 24,
    expiringCount: 3,
    lastUpdated: "2시간 전",
    image: "/modern-refrigerator.png",
  },
  {
    id: "2",
    name: "화장대 서랍",
    type: "drawer",
    itemCount: 18,
    expiringCount: 1,
    lastUpdated: "1일 전",
    image: "/makeup-drawer.png",
  },
  {
    id: "3",
    name: "욕실 수납장",
    type: "cabinet",
    itemCount: 12,
    expiringCount: 0,
    lastUpdated: "3일 전",
    image: "/bathroom-cabinet.png",
  },
]

const expiringItems = [
  {
    id: "1",
    name: "토마토",
    storageId: "1",
    storageName: "주방 냉장고",
    expiryDate: "2025-01-28",
    daysLeft: 2,
    category: "식품",
  },
  {
    id: "2",
    name: "파운데이션",
    storageId: "2",
    storageName: "화장대 서랍",
    expiryDate: "2025-01-30",
    daysLeft: 4,
    category: "화장품",
  },
  {
    id: "3",
    name: "우유",
    storageId: "1",
    storageName: "주방 냉장고",
    expiryDate: "2025-01-27",
    daysLeft: 1,
    category: "식품",
  },
]

const recentItems = [
  {
    id: "1",
    name: "새 립스틱",
    storageName: "화장대 서랍",
    addedDate: "오늘",
    category: "화장품",
  },
  {
    id: "2",
    name: "요거트",
    storageName: "주방 냉장고",
    addedDate: "어제",
    category: "식품",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="내 보관함" />

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{storageList.length}</div>
              <div className="text-xs text-muted-foreground">보관함</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {storageList.reduce((sum, storage) => sum + storage.itemCount, 0)}
              </div>
              <div className="text-xs text-muted-foreground">전체 물건</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">
                {storageList.reduce((sum, storage) => sum + storage.expiringCount, 0)}
              </div>
              <div className="text-xs text-muted-foreground">임박 물건</div>
            </CardContent>
          </Card>
        </div>

        {/* Expiring Items Alert */}
        {expiringItems.length > 0 && (
          <Card className="border-accent/50 bg-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <CardTitle className="text-base text-accent">유통기한 임박</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {expiringItems.slice(0, 2).map((item) => (
                <Link key={item.id} to={`/storage/${item.storageId}/item/${item.id}`}>
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.storageName}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.daysLeft <= 1 ? "destructive" : "secondary"} className="text-xs">
                        {item.daysLeft}일 남음
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
              {expiringItems.length > 2 && (
                <Link to="/search?filter=expiring">
                  <Button variant="ghost" size="sm" className="w-full text-accent">
                    {expiringItems.length - 2}개 더 보기
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}

        {/* Storage List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">내 보관함</h2>
            <Link to="/storage/new">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                추가
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {storageList.map((storage) => (
              <Link key={storage.id} to={`/storage/${storage.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={storage.image || "/placeholder.svg"}
                          alt={storage.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm truncate">{storage.name}</h3>
                          {storage.type === "refrigerator" && (
                            <Refrigerator className="h-3 w-3 text-muted-foreground" />
                          )}
                          {storage.type === "drawer" && <Archive className="h-3 w-3 text-muted-foreground" />}
                          {storage.type === "cabinet" && <Package className="h-3 w-3 text-muted-foreground" />}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span>{storage.itemCount}개 물건</span>
                          <span>•</span>
                          <span>{storage.lastUpdated}</span>
                        </div>

                        {storage.expiringCount > 0 && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-accent" />
                            <span className="text-xs text-accent font-medium">{storage.expiringCount}개 임박</span>
                          </div>
                        )}
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">최근 추가한 물건</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.storageName}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{item.addedDate}</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {item.category}
                  </Badge>
                </div>
              </div>
            ))}

            <Link to="/search?filter=recent">
              <Button variant="ghost" size="sm" className="w-full mt-2">
                더 보기
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Empty State (when no storage exists) */}
        {storageList.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">아직 보관함이 없어요</h3>
            <p className="text-muted-foreground text-sm mb-6">첫 번째 보관함을 만들어서 물건 관리를 시작해보세요</p>
            <Link to="/storage/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />첫 보관함 만들기
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  )
}
