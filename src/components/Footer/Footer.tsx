"use client";

import { useState, useEffect } from "react";

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  const shopLinks = ["All Products", "New Arrivals", "Best Sellers", "Sale"];
  const customerServiceLinks = [
    "Contact Us",
    "FAQ",
    "Shipping & Returns",
    "Size Guide",
  ];
  const aboutUsLinks = ["Our Story", "Careers", "Sustainability", "Press"];
  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Instagram, label: "Instagram" },
    { icon: Twitter, label: "Twitter" },
    { icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white  transition-colors duration-200 ease-in-out"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {customerServiceLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`/${item
                      .toLowerCase()
                      .replace(" ", "-")
                      .replace("&", "")
                      .replace("faq", "frequently-asked-questions")}`}
                    className="text-white transition-colors duration-200 ease-in-out"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">About Us</h3>
            <ul className="space-y-2">
              {aboutUsLinks.map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white transition-colors duration-200 ease-in-out"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Stay Connected</h3>
            <p className="text-sm">
              Get exclusive offers and updates straight to your inbox.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 ease-in-out"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex space-x-6 mb-4 md:mb-0">
            {socialLinks.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className=" text-white transition-colors duration-200 ease-in-out"
              >
                <Icon className="h-6 w-6 text-white" />
              </a>
            ))}
          </div>
          <div className="text-sm text-gray-400 text-center md:text-right">
            <p>© {currentYear} Your E-commerce Store. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a
                href="/privacy-policy"
                className="text-white transition-colors duration-200 ease-in-out"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-white transition-colors duration-200 ease-in-out"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
