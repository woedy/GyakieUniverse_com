import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import BackButton from "../ui/BackButton";

export default function Shop() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const products = [
    {
      id: 1,
      name: "Forever Tour T-Shirt",
      price: 35,
      image: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=T-Shirt",
      category: "Apparel",
      rating: 4.8,
      reviews: 124,
      description: "Comfortable cotton t-shirt from the Forever tour"
    },
    {
      id: 2,
      name: "Gyakie Signature Hoodie",
      price: 65,
      image: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Hoodie",
      category: "Apparel",
      rating: 4.9,
      reviews: 89,
      description: "Premium hoodie with embroidered logo"
    },
    {
      id: 3,
      name: "My Diary Vinyl Record",
      price: 45,
      image: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Vinyl",
      category: "Music",
      rating: 5.0,
      reviews: 67,
      description: "Limited edition vinyl with exclusive artwork"
    },
    {
      id: 4,
      name: "Gyakie Snapback Cap",
      price: 28,
      image: "https://via.placeholder.com/300x300/FFA07A/FFFFFF?text=Cap",
      category: "Accessories",
      rating: 4.7,
      reviews: 156,
      description: "Adjustable snapback with embroidered logo"
    },
    {
      id: 5,
      name: "Forever Album CD",
      price: 20,
      image: "https://via.placeholder.com/300x300/DDA0DD/FFFFFF?text=CD",
      category: "Music",
      rating: 4.9,
      reviews: 203,
      description: "Physical CD with digital download code"
    },
    {
      id: 6,
      name: "Gyakie Tote Bag",
      price: 25,
      image: "https://via.placeholder.com/300x300/FFD700/FFFFFF?text=Tote",
      category: "Accessories",
      rating: 4.6,
      reviews: 78,
      description: "Eco-friendly canvas tote bag"
    }
  ];

  const categories = ["All", "Apparel", "Music", "Accessories"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, count]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return sum + (product ? product.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white p-6">
      <BackButton />
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Official Store</h1>
          <p className="text-xl text-gray-300">Exclusive Gyakie merchandise and music</p>
        </header>

        {/* Cart Summary */}
        {getTotalItems() > 0 && (
          <div className="fixed top-4 right-4 z-40">
            <Card className="bg-black bg-opacity-80 border-orange-400">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-orange-400" />
                  <span className="font-semibold">{getTotalItems()} items</span>
                  <span className="text-orange-400">${getTotalPrice()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-black bg-opacity-30 rounded-lg p-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "ghost"}
                className={`${
                  selectedCategory === category
                    ? "bg-orange-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-black bg-opacity-30 border-gray-600 hover:border-orange-400 transition-all overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={`h-4 w-4 ${wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </Button>
                <Badge className="absolute top-2 left-2 bg-orange-600">
                  {product.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-white">{product.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {product.description}
                </CardDescription>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-300">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-400">${product.price}</span>
                  <div className="flex items-center gap-2">
                    {cart[product.id] && (
                      <Badge variant="secondary" className="bg-orange-600 text-white">
                        {cart[product.id]} in cart
                      </Badge>
                    )}
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Checkout Section */}
        {getTotalItems() > 0 && (
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-none">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Checkout?</h3>
                <p className="text-gray-200 mb-6">
                  You have {getTotalItems()} items in your cart for a total of ${getTotalPrice()}
                </p>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-200">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
