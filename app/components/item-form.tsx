import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Plus, Minus, Save } from "lucide-react"

interface ItemFormData {
  name: string
  quantity: number
  unit: string
  category: string
  expiryDate: string
  description: string
}

interface ItemFormProps {
  initialData?: Partial<ItemFormData>
  onSubmit: (data: ItemFormData) => void
  onCancel?: () => void
  submitLabel?: string
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

const defaultUnits = ["개", "병", "통", "팩", "봉지", "상자", "ml", "g", "kg"]

export function ItemForm({ initialData, onSubmit, onCancel, submitLabel = "저장하기" }: ItemFormProps) {
  const [formData, setFormData] = useState<ItemFormData>({
    name: "",
    quantity: 1,
    unit: "개",
    category: "",
    expiryDate: "",
    description: "",
    ...initialData,
  })

  const adjustQuantity = (delta: number) => {
    const newQuantity = Math.max(0, formData.quantity + delta)
    setFormData({ ...formData, quantity: newQuantity })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">물건 이름</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="예: 토마토, 립스틱"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="quantity">수량</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
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
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
              className="text-center"
              min="0"
              required
            />
            <Button
              type="button"
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
          <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {defaultUnits.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">카테고리</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="카테고리를 선택하세요" />
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
          value={formData.expiryDate}
          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">설명 (선택)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="물건에 대한 추가 정보를 입력하세요"
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            취소
          </Button>
        )}
        <Button type="submit" className={`gap-2 ${onCancel ? "flex-1" : "w-full"}`}>
          <Save className="h-4 w-4" />
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
