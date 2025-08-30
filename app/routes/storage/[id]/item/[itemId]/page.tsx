import { useState } from "react"
import { Header } from "~/components/header"
import { Navigation } from "~/components/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Badge } from "~/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Edit, Trash2, Package, MapPin, Clock, Plus, Minus, Save, X, AlertTriangle, CheckCircle } from "lucide-react"
import { useParams, useNavigate, Link } from "react-router"

// Mock data - 실제로는 API에서 가져올 데이터
const itemData = {
  id: "1",
  name: "토마토",
  quantity: 5,
  unit: "개",
  expiryDate: "2025-01-28",
  category: "채소",
  addedDate: "2025-01-20",
  description: "신선한 방울토마토",
  location: {
    storageId: "1",
    storageName: "주방 냉장고",
    sectionId: "1",
    sectionName: "냉장실 상단",
  },
  history: [
    {
      id: "1",
      action: "추가",
      date: "2025-01-20",
      details: "5개 추가됨",
    },
    {
      id: "2",
      action: "수량 변경",
      date: "2025-01-22",
      details: "7개 → 5개",
    },
  ],
}

const categories = [
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

export default function ItemDetailPage() {
  const params = useParams()
  const router = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(itemData)

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
        bgColor: "bg-destructive/10",
      }
    if (daysLeft <= 1)
      return {
        variant: "destructive" as const,
        text: `${daysLeft}일 남음`,
        icon: AlertTriangle,
        bgColor: "bg-destructive/10",
      }
    if (daysLeft <= 3)
      return {
        variant: "secondary" as const,
        text: `${daysLeft}일 남음`,
        icon: Clock,
        bgColor: "bg-accent/10",
      }
    return {
      variant: "outline" as const,
      text: `${daysLeft}일 남음`,
      icon: CheckCircle,
      bgColor: "bg-primary/10",
    }
  }

  const daysLeft = getDaysUntilExpiry(editData.expiryDate)
  const expiryStatus = getExpiryStatus(daysLeft)
  const StatusIcon = expiryStatus.icon

  const handleSave = () => {
    // TODO: API 호출로 아이템 업데이트
    console.log("Updating item:", editData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    // TODO: API 호출로 아이템 삭제
    console.log("Deleting item:", params.itemId)
    router(`/storage/${params.id}`)
  }

  const adjustQuantity = (delta: number) => {
    const newQuantity = Math.max(0, editData.quantity + delta)
    setEditData({ ...editData, quantity: newQuantity })
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title={itemData.name} showNotifications={false} />

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Item Overview */}
        <Card className={expiryStatus.bgColor}>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">{editData.name}</h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <StatusIcon className="h-4 w-4" />
                <Badge variant={expiryStatus.variant}>{expiryStatus.text}</Badge>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>
                  {editData.quantity} {editData.unit}
                </span>
                <span>•</span>
                <span>{editData.category}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={isEditing ? "secondary" : "default"}
            className="gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            {isEditing ? "취소" : "수정"}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Trash2 className="h-4 w-4" />
                삭제
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>정말 삭제하시겠어요?</AlertDialogTitle>
                <AlertDialogDescription>
                  이 작업은 되돌릴 수 없습니다. {itemData.name}이(가) 영구적으로 삭제됩니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Item Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">상세 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">수량</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => adjustQuantity(-1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        value={editData.quantity}
                        onChange={(e) => setEditData({ ...editData, quantity: Number.parseInt(e.target.value) || 0 })}
                        className="text-center"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => adjustQuantity(1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">단위</Label>
                    <Input
                      id="unit"
                      value={editData.unit}
                      onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select
                    value={editData.category}
                    onValueChange={(value) => setEditData({ ...editData, category: value })}
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="expiry">유통기한</Label>
                  <Input
                    id="expiry"
                    type="date"
                    value={editData.expiryDate}
                    onChange={(e) => setEditData({ ...editData, expiryDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">설명 (선택)</Label>
                  <Textarea
                    id="description"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    placeholder="물건에 대한 추가 정보를 입력하세요"
                  />
                </div>

                <Button onClick={handleSave} className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  저장하기
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">수량</Label>
                    <p className="font-medium">
                      {editData.quantity} {editData.unit}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">카테고리</Label>
                    <p className="font-medium">{editData.category}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">유통기한</Label>
                  <p className="font-medium">
                    {new Date(editData.expiryDate).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">추가일</Label>
                  <p className="font-medium">
                    {new Date(editData.addedDate).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {editData.description && (
                  <div>
                    <Label className="text-xs text-muted-foreground">설명</Label>
                    <p className="font-medium">{editData.description}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              위치
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link to={`/storage/${itemData.location.storageId}`}>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-sm">{itemData.location.storageName}</p>
                  <p className="text-xs text-muted-foreground">{itemData.location.sectionName}</p>
                </div>
                <div className="text-xs text-muted-foreground">보관함 보기</div>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">변경 이력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {itemData.history.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{entry.action}</p>
                  <p className="text-xs text-muted-foreground">{entry.details}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString("ko-KR", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Expiry Alert */}
        {daysLeft <= 3 && (
          <Card className="border-accent/50 bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-accent" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-accent">유통기한 주의</p>
                  <p className="text-xs text-muted-foreground">
                    {daysLeft < 0 ? "이미 만료되었습니다" : `${daysLeft}일 후 만료됩니다`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Navigation />
    </div>
  )
}
