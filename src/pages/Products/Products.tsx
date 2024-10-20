'use client'

import { useState,useEffect } from 'react'
import { ShoppingCart, Heart, ChevronDown } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RootState, AppDispatch } from "../../store/store";
import { fetchProducts } from "../../store/ProductsReducer";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images?: string[];
}
export default function Products() {
  const [sortBy, setSortBy] = useState('popularity')

 
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

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
          {items.slice(0,32).map((product:Product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={product.images?.[1]|| product.images?.[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                  width={300}
                  height={200}
                />
              </CardHeader> 
              <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold">
                    {product.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-2">
                    ${product.price.toFixed(2)}
                  </p>
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