
import { useState } from "react"
import { Menu, Search, ShoppingCart, User } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet"

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTitle>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          </SheetTitle>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <a href="/" className="text-lg font-semibold">
                Home
              </a>
              <a href="/products" className="text-lg font-semibold">
                Products
              </a>
              <a href="/categories" className="text-lg font-semibold">
                Categories
              </a>
              <a href="/about" className="text-lg font-semibold">
                About
              </a>
              <a href="/contact" className="text-lg font-semibold">
                Contact
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <a href="/" className="mr-6 flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6" />
          <span className="inline-block font-bold">MyShop</span>
        </a>
        <nav className="flex-1 items-center space-x-6 text-sm font-medium hidden md:flex">
          <a href="/products">Products</a>
          <a href="/categories">Categories</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
          <form className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[300px] pl-8"
              />
            </div>
          </form>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </div>
      {isSearchOpen && (
        <div className="container py-2 lg:hidden">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8"
              />
            </div>
          </form>
        </div>
      )}
    </header>
  )
}

export default Header;