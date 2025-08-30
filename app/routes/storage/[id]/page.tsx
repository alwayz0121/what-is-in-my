import { useState } from "react"
import { Header } from "~/components/header"
import { Navigation } from "~/components/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Plus, Edit, Package, Search, AlertTriangle } from "lucide-react"
import { Link, useParams } from "react-router"

// Mock data - 실제로는 API에서 가져올 데이터
const storageData = {
  id: "1",
  name: "주방 냉장고",
  type: "refrigerator",
  description: "메인 주방에 있는 냉장고입니다",
  image: "/modern-refrigerator.png",
  sections: [
    {
      id: "1",
      name: "냉장실 상단",
      items: [
        {
          id: "1",
          name: "토마토",
          quantity: 5,
          unit: "개",
          expiryDate: "2025-01-28",
          category: "채소",
          addedDate: "2025-01-20",
        },
        {
          id: "2",
          name: "우유",
          quantity: 1,
          unit: "팩",
          expiryDate: "2025-01-27",
          category: "유제품",
          addedDate: "2025-01-22",
        },
      ],
    },
    {
      id: "2",
      name: "냉장실 중단",
      items: [
        {
          id: "3",
          name: "김치",
          quantity: 1,
          unit: "통",
          expiryDate: "2025-02-15",
          category: "반찬",
          addedDate: "2025-01-15",
        },
      ],
    },
    {
      id: "3",
      name: "냉장실 하단",
      items: [],
    },
    {
      id: "4",
      name: "냉동실",
      items: [
        {
          id: "4",
          name: "냉동만두",
          quantity: 2,
          unit: "봉지",
          expiryDate: "2025-03-01",
          category: "냉동식품",
          addedDate: "2025-01-18",
        },
      ],
    },
  ],
}

export default function StorageDetailPage() {
  const params = useParams()
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)

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

  const selectedSectionData = storageData.sections.find((s) => s.id === selectedSection)

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title={storageData.name} />

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Storage Image */}
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={storageData.image || "/placeholder.svg"}
                alt={storageData.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2">
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">{storageData.name}</h2>
              {storageData.description && (
                <p className="text-sm text-muted-foreground mb-3">{storageData.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{storageData.sections.reduce((sum, section) => sum + section.items.length, 0)}개 물건</span>
                <span>•</span>
                <span>{storageData.sections.length}개 구역</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                물건 추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 물건 추가</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">물건 이름</Label>
                  <Input id="item-name" placeholder="예: 토마토, 립스틱" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">수량</Label>
                    <Input id="quantity" type="number" placeholder="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">단위</Label>
                    <Input id="unit" placeholder="개, 병, 통" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">유통기한</Label>
                  <Input id="expiry" type="date" />
                </div>
                <Button className="w-full">추가하기</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Link to={`/search?storage=${params.id}`}>
            <Button variant="outline" className="gap-2 w-full bg-transparent">
              <Search className="h-4 w-4" />
              검색
            </Button>
          </Link>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">구역별 보기</h3>

          <div className="grid grid-cols-2 gap-3">
            {storageData.sections.map((section) => (
              <Card
                key={section.id}
                className={`cursor-pointer transition-all ${
                  selectedSection === section.id ? "ring-2 ring-primary" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{section.name}</h4>
                    <p className="text-xs text-muted-foreground">{section.items.length}개 물건</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Section Items */}
        {selectedSectionData && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                {selectedSectionData.name}
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Plus className="h-3 w-3" />
                  추가
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedSectionData.items.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">아직 물건이 없어요</p>
                </div>
              ) : (
                selectedSectionData.items.map((item) => {
                  const daysLeft = getDaysUntilExpiry(item.expiryDate)
                  const expiryStatus = getExpiryStatus(daysLeft)

                  return (
                    <Link key={item.id} to={`/storage/${params.id}/item/${item.id}`}>
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
                })
              )}
            </CardContent>
          </Card>
        )}

        {/* All Items Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">전체 물건 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-foreground">
                  {storageData.sections.reduce((sum, section) => sum + section.items.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">전체</div>
              </div>
              <div>
                <div className="text-lg font-bold text-accent">
                  {
                    storageData.sections
                      .flatMap((s) => s.items)
                      .filter((item) => getDaysUntilExpiry(item.expiryDate) <= 3).length
                  }
                </div>
                <div className="text-xs text-muted-foreground">임박</div>
              </div>
              <div>
                <div className="text-lg font-bold text-destructive">
                  {
                    storageData.sections
                      .flatMap((s) => s.items)
                      .filter((item) => getDaysUntilExpiry(item.expiryDate) < 0).length
                  }
                </div>
                <div className="text-xs text-muted-foreground">만료</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  )
}
