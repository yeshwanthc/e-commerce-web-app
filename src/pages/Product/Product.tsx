"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState, AppDispatch } from "../../store/store";
import { fetchProducts } from "../../store/ProductsReducer";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
}

export default function Product() {
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

  const product: Product = items[0];

  console.log(product);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </a>
          </li>
          <ChevronRight className="h-4 w-4 text-gray-500" />
          <li>
            <a href="/category" className="text-gray-500 hover:text-gray-700">
              Audio
            </a>
          </li>
          <ChevronRight className="h-4 w-4 text-gray-500" />
          <li>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={product.images?.[1]}
            alt={product.title}
            className="w-full rounded-lg"
          />
          <div className="grid grid-cols-4 gap-4"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500">${product.price.toFixed(2)}</p>
          <p className="text-gray-500 mt-4">{product.description}</p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item: Product) => (
            <Card key={item.id}>
              <CardHeader className="p-0">
                <img
                  src={item.images?.[1]}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold">
                  {item.title}
                </CardTitle>
                <p className="mt-2 font-bold">${item.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full">View Product</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
