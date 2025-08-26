import { Bell, Menu } from "lucide-react"
import { Button } from "~/components/ui/button"

interface HeaderProps {
  title: string
  showNotifications?: boolean
  showMenu?: boolean
}

export function Header({ title, showNotifications = true, showMenu = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border lg:ml-72 lg:w-[calc(100%-18rem)]">
      <div className="flex items-center justify-between p-4 max-w-none lg:max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {showMenu && (
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-lg lg:text-xl font-semibold text-foreground">{title}</h1>
        </div>

        {showNotifications && (
          <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10 relative">
            <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full border-2 border-background" />
          </Button>
        )}
      </div>
    </header>
  )
}
