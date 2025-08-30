import { useState, useEffect } from "react"
import { Header } from "~/components/header"
import { Navigation } from "~/components/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Badge } from "~/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ExpiryBadge } from "~/components/expiry-badge"
import { Search, Clock, Package, MapPin, X, AlertTriangle } from "lucide-react"
import { Link, useSearchParams } from "react-router"

// Mock data - 실제로는 API에서 가져올 데이터
const allItems = [
  {
    id: "1",
    name: "토마토",
    quantity: 5,
    unit: "개",
    expiryDate: "2025-01-28",
    category: "채소",
    storageId: "1",
    storageName: "주방 냉장고",
    sectionName: "냉장실 상단",
    addedDate: "2025-01-20",
  },
  {
    id: "2",
    name: "우유",
    quantity: 1,
    unit: "팩",
    expiryDate: "2025-01-27",
    category: "유제품",
    storageId: "1",
    storageName: "주방 냉장고",
    sectionName: "냉장실 상단",
    addedDate: "2025-01-22",
  },
  {
    id: "3",
    name: "파운데이션",
    quantity: 1,
    unit: "개",
    expiryDate: "2025-01-30",
    category: "화장품",
    storageId: "2",
    storageName: "화장대 서랍",
    sectionName: "상단 칸",
    addedDate: "2025-01-15",
  },
  {
    id: "4",
    name: "김치",
    quantity: 1,
    unit: "통",
    expiryDate: "2025-02-15",
    category: "반찬",
    storageId: "1",
    storageName: "주방 냉장고",
    sectionName: "냉장실 중단",
    addedDate: "2025-01-15",
  },
  {
    id: "5",
    name: "냉동만두",
    quantity: 2,
    unit: "봉지",
    expiryDate: "2025-03-01",
    category: "냉동식품",
    storageId: "1",
    storageName: "주방 냉장고",
    sectionName: "냉동실",
    addedDate: "2025-01-18",
  },
]

const categories = [
  "전체",
  "채소",
  "과일",
  "육류",
  "생선",
  "유제품",
  "냉동식품",
  "반찬",
  "조미료",
  "음료",
  "화장품",
  "스킨케어",
  "메이크업",
  "헤어케어",
  "바디케어",
  "향수",
  "의약품",
  "건강식품",
  "생활용품",
  "기타",
]

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [sortBy, setSortBy] = useState("name")
  const [filteredItems, setFilteredItems] = useState(allItems)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // URL 파라미터에서 초기 필터 설정
    const filter = searchParams.get("filter")
    if (filter === "expiring") {
      setActiveTab("expiring")
    } else if (filter === "recent") {
      setActiveTab("recent")
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = allItems

    // 탭별 필터링
    if (activeTab === "expiring") {
      filtered = filtered.filter((item) => {
        const daysLeft = getDaysUntilExpiry(item.expiryDate)
        return daysLeft <= 3
      })
    } else if (activeTab === "recent") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      filtered = filtered.filter((item) => new Date(item.addedDate) >= oneWeekAgo)
    }

    // 검색어 필터링
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.storageName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // 카테고리 필터링
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "expiry":
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
        case "added":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredItems(filtered)
  }, [searchQuery, selectedCategory, sortBy, activeTab])

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("전체")
    setSortBy("name")
    setActiveTab("all")
  }

  const expiringCount = allItems.filter((item) => getDaysUntilExpiry(item.expiryDate) <= 3).length
  const recentCount = allItems.filter((item) => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return new Date(item.addedDate) >= oneWeekAgo
  }).length

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="물건 찾기" />

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="물건 이름, 카테고리, 보관함으로 검색"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">전체 ({allItems.length})</TabsTrigger>
            <TabsTrigger value="expiring" className="text-accent">
              임박 ({expiringCount})
            </TabsTrigger>
            <TabsTrigger value="recent">최근 ({recentCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">필터</h3>
                  <Button size="sm" variant="ghost" onClick={clearFilters}>
                    초기화
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">카테고리</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">정렬</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">이름순</SelectItem>
                        <SelectItem value="expiry">유통기한순</SelectItem>
                        <SelectItem value="added">최근 추가순</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expiring" className="space-y-4">
            <Card className="border-accent/50 bg-accent/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-accent" />
                  <h3 className="font-medium text-sm text-accent">유통기한 임박 물건</h3>
                </div>
                <p className="text-xs text-muted-foreground">3일 이내에 만료되는 물건들입니다</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="font-medium text-sm text-primary">최근 추가한 물건</h3>
                </div>
                <p className="text-xs text-muted-foreground">지난 7일 동안 추가된 물건들입니다</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">검색 결과</h3>
            <span className="text-sm text-muted-foreground">{filteredItems.length}개</span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="font-medium mb-2">검색 결과가 없어요</h4>
              <p className="text-sm text-muted-foreground mb-4">다른 검색어나 필터를 시도해보세요</p>
              <Button size="sm" onClick={clearFilters}>
                필터 초기화
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <Link key={item.id} to={`/storage/${item.storageId}/item/${item.id}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            {getDaysUntilExpiry(item.expiryDate) <= 3 && (
                              <AlertTriangle className="h-3 w-3 text-accent flex-shrink-0" />
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            <span>
                              {item.quantity} {item.unit}
                            </span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{item.storageName}</span>
                            <span>•</span>
                            <span>{item.sectionName}</span>
                          </div>
                        </div>

                        <div className="text-right ml-3">
                          <ExpiryBadge expiryDate={item.expiryDate} className="text-xs mb-1" />
                          <div className="text-xs text-muted-foreground">
                            {new Date(item.expiryDate).toLocaleDateString("ko-KR", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  )
}
