'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Heart, ChevronDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    reviews: 1024,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 299.99,
    rating: 4.7,
    reviews: 856,
    image: "/placeholder.svg?height=300&width=300",
    category: "Furniture",
  },
  {
    id: 3,
    name: "Smart Fitness Tracker",
    price: 99.99,
    rating: 4.6,
    reviews: 2048,
    image: "/placeholder.svg?height=300&width=300",
    category: "Wearables",
  },
  {
    id: 4,
    name: "Gourmet Coffee Maker",
    price: 149.99,
    rating: 4.9,
    reviews: 512,
    image: "/placeholder.svg?height=300&width=300",
    category: "Appliances",
  },
  {
    id: 5,
    name: "Lightweight Hiking Backpack",
    price: 79.99,
    rating: 4.5,
    reviews: 768,
    image: "/placeholder.svg?height=300&width=300",
    category: "Outdoor",
  },
  {
    id: 6,
    name: "Professional DSLR Camera",
    price: 1299.99,
    rating: 4.8,
    reviews: 384,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
  },
]

export default function Products() {
  const [sortBy, setSortBy] = useState('popularity')

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return b.reviews - a.reviews
    }
  })

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4 md:mb-0">Best Sellers</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by: {sortBy.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setSortBy('popularity')}>Popularity</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy('price-low')}>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy('price-high')}>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy('rating')}>Highest Rated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  width={300}
                  height={200}
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold line-clamp-2">{product.name}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <Button className="w-full mr-2">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}