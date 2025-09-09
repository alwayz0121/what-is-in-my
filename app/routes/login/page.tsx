import { Header } from "~/components/header"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Package } from "lucide-react"
import { Link } from "react-router"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="로그인" showNotifications={false} />

      <main className="p-4 max-w-md mx-auto">
        {/* Logo Section */}
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">다시 만나서 반가워요!</h2>
          <p className="text-muted-foreground text-sm">내 물건들이 기다리고 있어요</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">로그인</CardTitle>
            <CardDescription>간편하게 카카오로 로그인하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 카카오 로그인 버튼 */}
            <Button 
              className="w-full h-11 text-base font-semibold bg-[#FEE500] hover:bg-[#FEE500]/90 text-black" 
              type="button"
              onClick={() => {
                // 카카오 로그인 로직 구현
                console.log('카카오 로그인 클릭')
              }}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3C6.48 3 2 6.48 2 10.5c0 2.5 1.5 4.7 3.8 6.1L5 21l4.5-1.2c1.1.2 2.2.2 3.3 0L16 21l-0.8-4.4c2.3-1.4 3.8-3.6 3.8-6.1C19 6.48 14.52 3 12 3z"
                  fill="currentColor"
                />
              </svg>
              카카오로 로그인
            </Button>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center mt-6 pb-6">
          <p className="text-sm text-muted-foreground">
            아직 계정이 없으신가요?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
