"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeaturedProducts() {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log(data)
        setResponse(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => Math.min(prevCount + 8, response.length));
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {response.slice(0, visibleProducts).map((product: any) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                  width={300}
                  height={200}
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {visibleProducts < response.length && (
          <div className="mt-12 text-center">
            <Button onClick={loadMoreProducts} size="lg">
              View More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
