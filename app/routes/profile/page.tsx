import { useState } from "react"
import { Header } from "~/components/header"
import { Navigation } from "~/components/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
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
import { User, Bell, Shield, HelpCircle, LogOut, Edit, Save, X, Camera, Star } from "lucide-react"
import { Link } from "react-router"

// Mock data - 실제로는 API에서 가져올 데이터
const userData = {
  id: "1",
  name: "김민수",
  email: "minsu@example.com",
  avatar: null,
  joinDate: "2024-12-01",
  plan: "무료",
  stats: {
    totalStorages: 3,
    totalItems: 54,
    expiringItems: 4,
  },
  notifications: {
    expiry: true,
    newItems: false,
    weekly: true,
    email: true,
    push: false,
  },
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: userData.name,
    email: userData.email,
  })
  const [notifications, setNotifications] = useState(userData.notifications)

  const handleSave = () => {
    // TODO: API 호출로 프로필 업데이트
    console.log("Updating profile:", editData)
    setIsEditing(false)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value })
    // TODO: API 호출로 알림 설정 업데이트
    console.log("Updating notification:", key, value)
  }

  const handleLogout = () => {
    // TODO: 로그아웃 처리
    console.log("Logging out...")
  }

  const handleDeleteAccount = () => {
    // TODO: 계정 삭제 처리
    console.log("Deleting account...")
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="내 프로필" />

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={userData.avatar || undefined} />
                  <AvatarFallback className="text-lg bg-primary/20 text-primary">
                    {userData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="text-center"
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" onClick={handleSave} className="gap-2">
                      <Save className="h-3 w-3" />
                      저장
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="gap-2">
                      <X className="h-3 w-3" />
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                  <p className="text-muted-foreground text-sm mb-3">{userData.email}</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="outline">{userData.plan} 플랜</Badge>
                    <Badge variant="secondary">
                      {new Date(userData.joinDate).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                      })}{" "}
                      가입
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                    <Edit className="h-3 w-3" />
                    수정
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">내 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{userData.stats.totalStorages}</div>
                <div className="text-xs text-muted-foreground">보관함</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{userData.stats.totalItems}</div>
                <div className="text-xs text-muted-foreground">전체 물건</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{userData.stats.expiringItems}</div>
                <div className="text-xs text-muted-foreground">임박 물건</div>
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
            <CardDescription>원하는 알림을 선택하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">유통기한 알림</Label>
                <p className="text-xs text-muted-foreground">만료 3일 전 알림</p>
              </div>
              <Switch
                checked={notifications.expiry}
                onCheckedChange={(checked) => handleNotificationChange("expiry", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">새 물건 알림</Label>
                <p className="text-xs text-muted-foreground">물건 추가 시 알림</p>
              </div>
              <Switch
                checked={notifications.newItems}
                onCheckedChange={(checked) => handleNotificationChange("newItems", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">주간 요약</Label>
                <p className="text-xs text-muted-foreground">매주 월요일 요약 알림</p>
              </div>
              <Switch
                checked={notifications.weekly}
                onCheckedChange={(checked) => handleNotificationChange("weekly", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">이메일 알림</Label>
                <p className="text-xs text-muted-foreground">이메일로 알림 받기</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => handleNotificationChange("email", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-sm">푸시 알림</Label>
                <p className="text-xs text-muted-foreground">앱 푸시 알림 받기</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => handleNotificationChange("push", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Plan & Upgrade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-4 w-4" />
              플랜 관리
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">현재 플랜</p>
                <p className="text-xs text-muted-foreground">무료 플랜 사용 중</p>
              </div>
              <Badge variant="outline">무료</Badge>
            </div>

            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-medium text-sm text-primary mb-2">프리미엄으로 업그레이드</h4>
              <ul className="text-xs text-muted-foreground space-y-1 mb-3">
                <li>• 무제한 보관함</li>
                <li>• 고급 통계 및 분석</li>
                <li>• 자동 백업</li>
                <li>• 우선 고객 지원</li>
              </ul>
              <Button size="sm" className="w-full">
                업그레이드하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">계정 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/settings">
              <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                <Shield className="h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium text-sm">설정</p>
                  <p className="text-xs text-muted-foreground">앱 설정 및 환경설정</p>
                </div>
              </Button>
            </Link>

            <Link to="/help">
              <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                <HelpCircle className="h-4 w-4" />
                <div className="text-left">
                  <p className="font-medium text-sm">도움말</p>
                  <p className="text-xs text-muted-foreground">사용법 및 FAQ</p>
                </div>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-3 text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <div className="text-left">
                <p className="font-medium text-sm">로그아웃</p>
                <p className="text-xs text-muted-foreground">계정에서 로그아웃</p>
              </div>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto p-3 text-destructive hover:text-destructive"
                >
                  <User className="h-4 w-4" />
                  <div className="text-left">
                    <p className="font-medium text-sm">계정 삭제</p>
                    <p className="text-xs text-muted-foreground">모든 데이터가 삭제됩니다</p>
                  </div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 계정을 삭제하시겠어요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다. 모든 보관함, 물건 정보, 설정이 영구적으로 삭제됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground"
                  >
                    계정 삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  )
}
