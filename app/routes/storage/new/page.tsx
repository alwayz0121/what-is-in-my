import type React from "react"

import { useState } from "react"
import { Header } from "~/components/header"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Badge } from "~/components/ui/badge"
import { Upload, Camera, Plus, X } from "lucide-react"
import { useNavigate } from "react-router"

const presetLayouts = [
  {
    id: "fridge-basic",
    name: "기본 냉장고",
    type: "refrigerator",
    sections: ["냉장실 상단", "냉장실 중단", "냉장실 하단", "냉동실"],
  },
  {
    id: "drawer-3x2",
    name: "3x2 서랍",
    type: "drawer",
    sections: ["왼쪽 상단", "가운데 상단", "오른쪽 상단", "왼쪽 하단", "가운데 하단", "오른쪽 하단"],
  },
  {
    id: "cabinet-shelves",
    name: "선반형 수납장",
    type: "cabinet",
    sections: ["상단 선반", "중간 선반", "하단 선반"],
  },
]

export default function StorageNewPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    image: null as File | null,
    layout: "",
    customSections: [] as string[],
  })
  const [newSectionName, setNewSectionName] = useState("")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const handlePresetSelect = (presetId: string) => {
    const preset = presetLayouts.find((p) => p.id === presetId)
    if (preset) {
      setFormData({
        ...formData,
        layout: presetId,
        type: preset.type,
        customSections: [...preset.sections],
      })
    }
  }

  const addCustomSection = () => {
    if (newSectionName.trim()) {
      setFormData({
        ...formData,
        customSections: [...formData.customSections, newSectionName.trim()],
      })
      setNewSectionName("")
    }
  }

  const removeSection = (index: number) => {
    setFormData({
      ...formData,
      customSections: formData.customSections.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = () => {
    // TODO: API 호출로 보관함 생성
    console.log("Creating storage:", formData)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="새 보관함 만들기" showNotifications={false} />

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">기본 정보</CardTitle>
              <CardDescription>보관함의 이름과 설명을 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">보관함 이름</Label>
                <Input
                  id="name"
                  placeholder="예: 주방 냉장고, 화장대 서랍"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명 (선택)</Label>
                <Textarea
                  id="description"
                  placeholder="보관함에 대한 간단한 설명을 입력하세요"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">보관함 종류</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="종류를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refrigerator">냉장고</SelectItem>
                    <SelectItem value="drawer">서랍</SelectItem>
                    <SelectItem value="cabinet">수납장</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => setStep(2)} className="w-full" disabled={!formData.name.trim() || !formData.type}>
                다음 단계
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Photo Upload */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">사진 업로드</CardTitle>
              <CardDescription>보관함 사진을 업로드하면 구역을 설정할 수 있어요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                {formData.image ? (
                  <div className="space-y-4">
                    <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(formData.image) || "/placeholder.svg"}
                        alt="업로드된 이미지"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{formData.image.name}</p>
                    <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, image: null })}>
                      다시 선택
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">사진을 업로드하세요</p>
                      <p className="text-sm text-muted-foreground">JPG, PNG 파일을 지원합니다</p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="sm" asChild>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Camera className="h-4 w-4 mr-2" />
                          갤러리에서 선택
                        </label>
                      </Button>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  이전
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  다음 단계
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Layout Setup */}
        {step === 3 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">구역 설정</CardTitle>
                <CardDescription>프리셋을 선택하거나 직접 구역을 만들어보세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>프리셋 레이아웃</Label>
                  <div className="grid gap-2">
                    {presetLayouts
                      .filter((preset) => !formData.type || preset.type === formData.type)
                      .map((preset) => (
                        <Button
                          key={preset.id}
                          variant={formData.layout === preset.id ? "default" : "outline"}
                          className="justify-start h-auto p-3"
                          onClick={() => handlePresetSelect(preset.id)}
                        >
                          <div className="text-left">
                            <div className="font-medium">{preset.name}</div>
                            <div className="text-xs text-muted-foreground">{preset.sections.length}개 구역</div>
                          </div>
                        </Button>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">구역 목록</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {formData.customSections.map((section, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="secondary" className="flex-1 justify-between">
                        {section}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-2"
                          onClick={() => removeSection(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="새 구역 이름"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCustomSection()}
                  />
                  <Button size="icon" onClick={addCustomSection} disabled={!newSectionName.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    이전
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1" disabled={formData.customSections.length === 0}>
                    보관함 만들기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
