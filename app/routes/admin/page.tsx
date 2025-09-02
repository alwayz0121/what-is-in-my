import { useState } from "react"
import { Header } from "~/components/header"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Badge } from "~/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
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
import {
  Users,
  Activity,
  AlertTriangle,
  Search,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  Database,
  Server,
  Shield,
} from "lucide-react"

// Mock data - 실제로는 API에서 가져올 데이터
const adminStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalStorages: 3421,
  totalItems: 15678,
  errorCount: 23,
  warningCount: 156,
}

const users = [
  {
    id: "1",
    name: "김민수",
    email: "minsu@example.com",
    joinDate: "2024-12-01",
    lastActive: "2025-01-26",
    storageCount: 3,
    itemCount: 54,
    status: "active",
  },
  {
    id: "2",
    name: "이영희",
    email: "younghee@example.com",
    joinDate: "2024-11-15",
    lastActive: "2025-01-25",
    storageCount: 2,
    itemCount: 32,
    status: "active",
  },
  {
    id: "3",
    name: "박철수",
    email: "chulsoo@example.com",
    joinDate: "2024-10-20",
    lastActive: "2025-01-20",
    storageCount: 1,
    itemCount: 18,
    status: "inactive",
  },
]

const logs = [
  {
    id: "1",
    type: "error",
    message: "Database connection timeout",
    timestamp: "2025-01-26 14:32:15",
    userId: "user_123",
    details: "Connection to primary database failed after 30s timeout",
  },
  {
    id: "2",
    type: "warning",
    message: "High memory usage detected",
    timestamp: "2025-01-26 14:28:42",
    userId: null,
    details: "Memory usage reached 85% of available capacity",
  },
  {
    id: "3",
    type: "info",
    message: "User login successful",
    timestamp: "2025-01-26 14:25:18",
    userId: "user_456",
    details: "User logged in from IP: 192.168.1.100",
  },
  {
    id: "4",
    type: "error",
    message: "Failed to send notification email",
    timestamp: "2025-01-26 14:20:33",
    userId: "user_789",
    details: "SMTP server returned error: 550 Mailbox unavailable",
  },
]

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLogType, setSelectedLogType] = useState("all")
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [filteredLogs, setFilteredLogs] = useState(logs)

  const handleUserSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  const handleLogFilter = (type: string) => {
    setSelectedLogType(type)
    const filtered = type === "all" ? logs : logs.filter((log) => log.type === type)
    setFilteredLogs(filtered)
  }

  const deleteUser = (userId: string) => {
    // TODO: API 호출로 사용자 삭제
    console.log("Deleting user:", userId)
  }

  const exportLogs = () => {
    // TODO: 로그 내보내기 구현
    console.log("Exporting logs...")
  }

  const refreshData = () => {
    // TODO: 데이터 새로고침 구현
    console.log("Refreshing data...")
  }

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      case "info":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "secondary"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="관리자 패널" showNotifications={false} />

      <main className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Admin Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">전체 사용자</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{adminStats.activeUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">활성 사용자</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Database className="h-6 w-6 text-foreground mx-auto mb-2" />
              <div className="text-2xl font-bold">{adminStats.totalStorages.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">전체 보관함</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold">{adminStats.errorCount}</div>
              <div className="text-xs text-muted-foreground">오류</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">빠른 작업</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" onClick={refreshData} className="gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                새로고침
              </Button>
              <Button variant="outline" onClick={exportLogs} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                로그 내보내기
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Server className="h-4 w-4" />
                시스템 상태
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Shield className="h-4 w-4" />
                보안 설정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">사용자 관리</TabsTrigger>
            <TabsTrigger value="logs">로그 및 오류</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">사용자 계정 관리</CardTitle>
                <CardDescription>등록된 사용자 계정을 조회하고 관리하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="사용자 이름 또는 이메일로 검색"
                    value={searchQuery}
                    onChange={(e) => handleUserSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{user.name}</h4>
                          <Badge variant={getStatusColor(user.status) as any}>
                            {user.status === "active" ? "활성" : "비활성"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{user.email}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>가입: {user.joinDate}</span>
                          <span>•</span>
                          <span>최근 활동: {user.lastActive}</span>
                          <span>•</span>
                          <span>{user.storageCount}개 보관함</span>
                          <span>•</span>
                          <span>{user.itemCount}개 물건</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>사용자 계정을 삭제하시겠어요?</AlertDialogTitle>
                              <AlertDialogDescription>
                                이 작업은 되돌릴 수 없습니다. {user.name}의 모든 데이터가 영구적으로 삭제됩니다.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>취소</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteUser(user.id)}
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
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">검색 결과가 없습니다</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">시스템 로그</CardTitle>
                <CardDescription>시스템 오류 및 활동 로그를 확인하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Select value={selectedLogType} onValueChange={handleLogFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="error">오류</SelectItem>
                      <SelectItem value="warning">경고</SelectItem>
                      <SelectItem value="info">정보</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={exportLogs} className="gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    내보내기
                  </Button>
                </div>

                <div className="space-y-3">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getLogTypeColor(log.type) as any}>{log.type.toUpperCase()}</Badge>
                          <span className="font-medium text-sm">{log.message}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{log.details}</p>
                      {log.userId && <p className="text-xs text-muted-foreground">사용자 ID: {log.userId}</p>}
                    </div>
                  ))}
                </div>

                {filteredLogs.length === 0 && (
                  <div className="text-center py-8">
                    <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">해당 타입의 로그가 없습니다</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
