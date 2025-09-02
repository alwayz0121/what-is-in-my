import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "~/components/navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <div className="min-h-screen bg-background">
          {/* Navigation - PC에서는 사이드바, 모바일에서는 하단 네비게이션 */}
          <Navigation />

          {/* Main Content Area */}
          <div className="lg:pl-72">
            <main className="min-h-screen">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
