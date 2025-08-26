import { Header } from "~/components/header"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Package, Clock, Search, Plus } from "lucide-react"
import { Link } from "react-router"

export function meta() {
  return [
    { title: "와츠인마이 - 냉장고와 서랍 관리" },
    { name: "description", content: "냉장고와 서랍 속 물건들을 쉽게 관리하고 유통기한을 추적하세요" },
  ];
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-20">
      <div className="lg:hidden">
        <Header title="와츠인마이" />
      </div>

      <main className="p-6 lg:p-12 max-w-md lg:max-w-6xl mx-auto space-y-8 lg:space-y-12">
        <div className="text-center py-12 lg:py-20">
          <div className="w-24 h-24 lg:w-32 lg:h-32 border-2 border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8">
            <Package className="h-12 w-12 lg:h-16 lg:w-16 text-primary stroke-[1.5]" />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-3 lg:mb-6 tracking-tight">와츠인마이</h1>
          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            냉장고와 서랍 속 물건들을
            <br />
            쉽고 예쁘게 관리해보세요
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Link to="storage/new">
            <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-2 hover:border-primary/20">
              <CardContent className="flex flex-col items-center p-8 lg:p-10">
                <div className="w-14 h-14 lg:w-16 lg:h-16 border-2 border-primary/30 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-7 w-7 lg:h-8 lg:w-8 text-primary stroke-[1.5]" />
                </div>
                <h3 className="font-semibold text-base lg:text-lg">새 보관함</h3>
                <p className="text-sm lg:text-base text-muted-foreground text-center mt-2">냉장고나 서랍 추가</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/search">
            <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-2 hover:border-accent/20">
              <CardContent className="flex flex-col items-center p-8 lg:p-10">
                <div className="w-14 h-14 lg:w-16 lg:h-16 border-2 border-accent/30 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-7 w-7 lg:h-8 lg:w-8 text-accent stroke-[1.5]" />
                </div>
                <h3 className="font-semibold text-base lg:text-lg">물건 찾기</h3>
                <p className="text-sm lg:text-base text-muted-foreground text-center mt-2">빠른 검색</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard" className="lg:block hidden">
            <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-2 hover:border-primary/20">
              <CardContent className="flex flex-col items-center p-10">
                <div className="w-16 h-16 border-2 border-primary/30 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-primary stroke-[1.5]" />
                </div>
                <h3 className="font-semibold text-lg">대시보드</h3>
                <p className="text-base text-muted-foreground text-center mt-2">전체 현황 보기</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/profile" className="lg:block hidden">
            <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border-2 hover:border-accent/20">
              <CardContent className="flex flex-col items-center p-10">
                <div className="w-16 h-16 border-2 border-accent/30 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary stroke-[1.5]" />
                </div>
                <h3 className="font-semibold text-lg">프로필</h3>
                <p className="text-base text-muted-foreground text-center mt-2">계정 관리</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          <Card className="border-2">
            <CardHeader className="pb-4 lg:pb-6">
              <CardTitle className="text-xl lg:text-2xl font-bold">주요 기능</CardTitle>
              <CardDescription className="text-base lg:text-lg">와츠인마이로 할 수 있는 일들</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 lg:space-y-8">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 lg:h-7 lg:w-7 text-primary stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-semibold text-base lg:text-lg">보관함 관리</h4>
                  <p className="text-sm lg:text-base text-muted-foreground mt-1">냉장고, 서랍별로 물건 정리</p>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-accent/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 lg:h-7 lg:w-7 text-accent stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-semibold text-base lg:text-lg">유통기한 관리</h4>
                  <p className="text-sm lg:text-base text-muted-foreground mt-1">화장품, 식품 유통기한 추적</p>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Search className="h-6 w-6 lg:h-7 lg:w-7 text-primary stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-semibold text-base lg:text-lg">빠른 검색</h4>
                  <p className="text-sm lg:text-base text-muted-foreground mt-1">물건 위치를 즉시 확인</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="pt-6 lg:pt-0 space-y-4 lg:space-y-6">
            <Link to="/dashboard">
              <Button className="w-full h-14 lg:h-16 text-lg lg:text-xl font-semibold rounded-xl border-2 border-primary hover:border-primary/80 transition-all duration-200">
                시작하기
              </Button>
            </Link>

            <div className="text-center pt-2">
              <p className="text-base lg:text-lg text-muted-foreground">
                계정이 없으신가요?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline underline-offset-4">
                  회원가입
                </Link>{" "}
                또는{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline underline-offset-4">
                  로그인
                </Link>
              </p>
            </div>

            {/* Desktop-only additional info */}
            <div className="hidden lg:block pt-8">
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-lg mb-2">💡 팁</h4>
                  <p className="text-muted-foreground">PC에서는 더 넓은 화면으로 편리하게 관리할 수 있어요!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
