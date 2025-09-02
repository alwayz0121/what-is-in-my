import { useState } from "react"
import { Header } from "~/components/header"
import { Navigation } from "~/components/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
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
import {
  Globe,
  Bell,
  Palette,
  Database,
  Shield,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Save,
  X,
  Moon,
  Sun,
  Smartphone,
} from "lucide-react"

// Mock data - 실제로는 API에서 가져올 데이터
const settingsData = {
  language: "ko",
  theme: "light",
  notifications: {
    expiry: true,
    newItems: false,
    weekly: true,
    method: "both", // email, push, both
  },
  dataRetention: 365, // days
  autoBackup: true,
  customPresets: [
    {
      id: "1",
      name: "내 냉장고 레이아웃",
      type: "refrigerator",
      sections: ["냉장실 상단", "냉장실 중단", "냉장실 하단", "냉동실", "문짝"],
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      name: "화장대 서랍",
      type: "drawer",
      sections: ["립스틱", "파운데이션", "아이섀도", "브러시", "기타"],
      createdAt: "2025-01-18",
    },
  ],
}

const languages = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
]

const themes = [
  { value: "light", name: "라이트", icon: Sun },
  { value: "dark", name: "다크", icon: Moon },
  { value: "system", name: "시스템", icon: Smartphone },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState(settingsData)
  const [isCreatePresetOpen, setIsCreatePresetOpen] = useState(false)
  const [newPreset, setNewPreset] = useState({
    name: "",
    type: "refrigerator",
    sections: [] as string[],
  })
  const [newSectionName, setNewSectionName] = useState("")

  const handleSettingChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value })
    // TODO: API 호출로 설정 저장
    console.log("Setting changed:", key, value)
  }

  const handleNotificationChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [key]: value },
    })
    // TODO: API 호출로 알림 설정 저장
    console.log("Notification setting changed:", key, value)
  }

  const addSectionToPreset = () => {
    if (newSectionName.trim()) {
      setNewPreset({
        ...newPreset,
        sections: [...newPreset.sections, newSectionName.trim()],
      })
      setNewSectionName("")
    }
  }

  const removeSectionFromPreset = (index: number) => {
    setNewPreset({
      ...newPreset,
      sections: newPreset.sections.filter((_, i) => i !== index),
    })
  }

  const savePreset = () => {
    if (newPreset.name.trim() && newPreset.sections.length > 0) {
      const preset = {
        ...newPreset,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      }
      setSettings({
        ...settings,
        customPresets: [...settings.customPresets, preset],
      })
      setNewPreset({ name: "", type: "refrigerator", sections: [] })
      setIsCreatePresetOpen(false)
      // TODO: API 호출로 프리셋 저장
      console.log("Saving preset:", preset)
    }
  }

  const deletePreset = (presetId: string) => {
    setSettings({
      ...settings,
      customPresets: settings.customPresets.filter((p) => p.id !== presetId),
    })
    // TODO: API 호출로 프리셋 삭제
    console.log("Deleting preset:", presetId)
  }

  const exportData = () => {
    // TODO: 데이터 내보내기 구현
    console.log("Exporting data...")
  }

  const importData = () => {
    // TODO: 데이터 가져오기 구현
    console.log("Importing data...")
  }

  const clearAllData = () => {
    // TODO: 모든 데이터 삭제 구현
    console.log("Clearing all data...")
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="설정" showNotifications={false} />

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Language & Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-4 w-4" />
              언어 및 테마
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>언어</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>테마</Label>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((theme) => {
                  const Icon = theme.icon
                  return (
                    <Button
                      key={theme.value}
                      variant={settings.theme === theme.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSettingChange("theme", theme.value)}
                      className="flex flex-col gap-1 h-auto p-3"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs">{theme.name}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-4 w-4" />
              알림 설정
            </CardTitle>
            <CardDescription>알림 방식과 종류를 설정하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>알림 방식</Label>
              <Select
                value={settings.notifications.method}
                onValueChange={(value) => handleNotificationChange("method", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">이메일만</SelectItem>
                  <SelectItem value="push">푸시 알림만</SelectItem>
                  <SelectItem value="both">이메일 + 푸시</SelectItem>
                  <SelectItem value="none">알림 끄기</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">유통기한 알림</Label>
                <p className="text-xs text-muted-foreground">만료 3일 전 알림</p>
              </div>
              <Switch
                checked={settings.notifications.expiry}
                onCheckedChange={(checked) => handleNotificationChange("expiry", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">새 물건 알림</Label>
                <p className="text-xs text-muted-foreground">물건 추가 시 알림</p>
              </div>
              <Switch
                checked={settings.notifications.newItems}
                onCheckedChange={(checked) => handleNotificationChange("newItems", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">주간 요약</Label>
                <p className="text-xs text-muted-foreground">매주 월요일 요약</p>
              </div>
              <Switch
                checked={settings.notifications.weekly}
                onCheckedChange={(checked) => handleNotificationChange("weekly", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Custom Presets */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-4 w-4" />
              나만의 프리셋
            </CardTitle>
            <CardDescription>자주 사용하는 보관함 구조를 저장하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">저장된 프리셋</span>
              <Dialog open={isCreatePresetOpen} onOpenChange={setIsCreatePresetOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-3 w-3" />
                    추가
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>새 프리셋 만들기</DialogTitle>
                    <DialogDescription>자주 사용하는 보관함 구조를 저장하세요</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="preset-name">프리셋 이름</Label>
                      <Input
                        id="preset-name"
                        value={newPreset.name}
                        onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                        placeholder="예: 내 냉장고 레이아웃"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preset-type">보관함 종류</Label>
                      <Select
                        value={newPreset.type}
                        onValueChange={(value) => setNewPreset({ ...newPreset, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="refrigerator">냉장고</SelectItem>
                          <SelectItem value="drawer">서랍</SelectItem>
                          <SelectItem value="cabinet">수납장</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>구역 목록</Label>
                      <div className="space-y-2">
                        {newPreset.sections.map((section, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="secondary" className="flex-1 justify-between">
                              {section}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2"
                                onClick={() => removeSectionFromPreset(index)}
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
                          onKeyPress={(e) => e.key === "Enter" && addSectionToPreset()}
                        />
                        <Button size="icon" onClick={addSectionToPreset} disabled={!newSectionName.trim()}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" onClick={() => setIsCreatePresetOpen(false)} className="flex-1">
                        취소
                      </Button>
                      <Button onClick={savePreset} className="flex-1 gap-2">
                        <Save className="h-4 w-4" />
                        저장
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {settings.customPresets.map((preset) => (
                <div key={preset.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{preset.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {preset.sections.length}개 구역 • {preset.createdAt}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-6 w-6">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>프리셋을 삭제하시겠어요?</AlertDialogTitle>
                          <AlertDialogDescription>
                            이 작업은 되돌릴 수 없습니다. "{preset.name}" 프리셋이 영구적으로 삭제됩니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deletePreset(preset.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            삭제
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}

              {settings.customPresets.length === 0 && (
                <div className="text-center py-6">
                  <Palette className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">아직 저장된 프리셋이 없어요</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-4 w-4" />
              데이터 관리
            </CardTitle>
            <CardDescription>데이터 백업, 복원 및 삭제</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">자동 백업</Label>
                <p className="text-xs text-muted-foreground">매일 자동으로 데이터 백업</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>데이터 보관 기간</Label>
              <Select
                value={settings.dataRetention.toString()}
                onValueChange={(value) => handleSettingChange("dataRetention", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30일</SelectItem>
                  <SelectItem value="90">90일</SelectItem>
                  <SelectItem value="180">180일</SelectItem>
                  <SelectItem value="365">1년</SelectItem>
                  <SelectItem value="0">무제한</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={exportData} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                내보내기
              </Button>
              <Button variant="outline" onClick={importData} className="gap-2 bg-transparent">
                <Upload className="h-4 w-4" />
                가져오기
              </Button>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full gap-2 text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                  모든 데이터 삭제
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 모든 데이터를 삭제하시겠어요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다. 모든 보관함, 물건 정보, 설정이 영구적으로 삭제됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={clearAllData} className="bg-destructive text-destructive-foreground">
                    모든 데이터 삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-4 w-4" />
              개인정보 및 보안
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start h-auto p-3">
              <div className="text-left">
                <p className="font-medium text-sm">개인정보처리방침</p>
                <p className="text-xs text-muted-foreground">개인정보 수집 및 이용에 대한 안내</p>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-start h-auto p-3">
              <div className="text-left">
                <p className="font-medium text-sm">이용약관</p>
                <p className="text-xs text-muted-foreground">서비스 이용에 관한 약관</p>
              </div>
            </Button>

            <Button variant="ghost" className="w-full justify-start h-auto p-3">
              <div className="text-left">
                <p className="font-medium text-sm">오픈소스 라이선스</p>
                <p className="text-xs text-muted-foreground">사용된 오픈소스 라이브러리 정보</p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">와츠인마이</p>
            <p className="text-xs text-muted-foreground">버전 1.0.0</p>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  )
}
