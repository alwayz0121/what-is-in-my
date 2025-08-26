import { Header } from "~/components/header"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Mail, ArrowLeft } from "lucide-react"
import { Link } from "react-router"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="비밀번호 찾기" showNotifications={false} />

      <main className="p-4 max-w-md mx-auto">
        <div className="py-8">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg">비밀번호를 잊으셨나요?</CardTitle>
              <CardDescription>가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드려요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="가입하신 이메일을 입력하세요" className="pl-10" />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 text-base font-semibold">
                  재설정 링크 보내기
                </Button>
              </form>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  로그인으로 돌아가기
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
