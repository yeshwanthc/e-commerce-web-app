'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RootState, AppDispatch } from "../../store/store";
import { fetchProducts } from "../../store/ProductsReducer";


const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 199.99,
  rating: 4.8,
  reviews: 1024,
  description: "Experience crystal-clear audio with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology, Bluetooth 5.0 connectivity, and up to 30 hours of battery life, these headphones are perfect for music lovers and professionals alike.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Bluetooth 5.0",
    "Comfortable over-ear design",
    "Built-in microphone for calls",
  ],
  specs: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Impedance": "32 Ohm",
    "Weight": "250g",
  },
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  colors: ["Black", "Silver", "Blue"],
}

const relatedProducts = [
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 99.99,
    rating: 4.6,
    reviews: 728,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    rating: 4.5,
    reviews: 512,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Noise-Cancelling Headphones",
    price: 249.99,
    rating: 4.9,
    reviews: 1256,
    image: "/placeholder.svg?height=200&width=200",
  },
]
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images?: string[];
}

export default function Product() {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
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
    <div className="container mx-auto px-4 py-8">
      <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
          <ChevronRight className="h-4 w-4 text-gray-500" />
          <li><a href="/category" className="text-gray-500 hover:text-gray-700">Audio</a></li>
          <ChevronRight className="h-4 w-4 text-gray-500" />
          <li><span className="text-gray-900 font-medium">{product.name}</span></li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img src={mainImage} alt={product.name} className="w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - View ${index + 1}`}
                className="w-full h-24 object-cover rounded-md cursor-pointer"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>

          <div>
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                className="p-2"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                className="p-2"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share product</span>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="features" className="mt-12">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-4">
          <ul className="list-disc pl-5 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="specs" className="mt-4">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <dt className="font-medium text-gray-900">{key}</dt>
                <dd className="mt-1 text-gray-600">{value}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>
      </Tabs>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.slice(0,4).map((product:Product) => (
            <Card key={product.id}>
              <CardHeader className="p-0">
                <img
                  src={product.images?.[1]}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold">{product.title}</CardTitle>
              
                <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">View Product</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}