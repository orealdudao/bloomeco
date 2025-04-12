"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calculator, ClipboardList, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/registration",
      label: "Cadastro de Itens",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
      active: pathname === "/registration",
    },
    {
      href: "/composition",
      label: "Composição de Produtos",
      icon: <Calculator className="mr-2 h-4 w-4" />,
      active: pathname === "/composition",
    },
  ]

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl">
          PrecificaFácil
        </Link>
        <nav className="hidden md:flex ml-auto space-x-4">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button variant={route.active ? "default" : "ghost"} className="flex items-center">
                {route.icon}
                {route.label}
              </Button>
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 mt-4">
              {routes.map((route) => (
                <Link key={route.href} href={route.href}>
                  <Button variant={route.active ? "default" : "ghost"} className="w-full justify-start">
                    {route.icon}
                    {route.label}
                  </Button>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
