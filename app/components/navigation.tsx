import { Link, useLocation } from "react-router"
import { Button } from "~/components/ui/button"
import { Home, Package, Search, User, Settings, Plus } from "lucide-react"
import { cn } from "~/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "홈" },
  { href: "/dashboard", icon: Package, label: "대시보드" },
  { href: "/search", icon: Search, label: "검색" },
  { href: "/storage/new", icon: Plus, label: "추가" },
  { href: "/profile", icon: User, label: "프로필" },
  { href: "/settings", icon: Settings, label: "설정" },
]

export function Navigation() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex lg:fixed lg:inset-y-0 lg:z-30 lg:w-72 lg:flex-col lg:bg-card lg:border-r lg:border-border">
        <div className="flex flex-col h-full">
          {/* Logo/Brand - header 높이와 맞춤 */}
          <div className="flex items-center gap-3 p-6 border-b border-border h-[72px]">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">내 물건 찾기</h2>
              <p className="text-xs text-muted-foreground">냉장고 & 서랍 관리</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                    isActive
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">사용자</p>
                <p className="text-xs text-muted-foreground truncate">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
