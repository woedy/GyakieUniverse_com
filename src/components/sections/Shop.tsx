import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ShoppingCart, Heart, Star, X, Plus, Info } from "lucide-react";
import BackButton from "../ui/BackButton";
import largeDesktopImage from '/images/cover/pose.jpg'; // 1024px+
import video1 from '/images/cover/video1.png';


interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  details: string;
  sizes?: string[];
}

interface Hotspot {
  id: number;
  x: number; // percentage
  y: number; // percentage
  productId: number;
}

export default function Shop() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [backgroundPosition, setBackgroundPosition] = useState(50); // percentage from left
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile scroll to pan background
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          
          // Convert scroll position to background position (0-100%)
          const scrollProgress = Math.max(0, Math.min(1, scrollY / Math.max(1, maxScroll)));
          const newPosition = scrollProgress * 100;
          
          setBackgroundPosition(newPosition);
          lastScrollY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Enable scrolling on mobile by making the container scrollable
    document.body.style.height = '300vh'; // Allow for scroll space
    document.body.style.overflow = 'auto';
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.height = 'auto';
      document.body.style.overflow = 'hidden';
    };
  }, [isMobile]);

  const products: Product[] = [
    {
      id: 1,
      name: "Forever Tour T-Shirt",
      price: 35,
      image: video1,
      category: "Apparel",
      rating: 4.8,
      reviews: 124,
      description: "Comfortable cotton t-shirt from the Forever tour",
      details: "100% organic cotton, pre-shrunk, screen-printed design. Available in multiple sizes with a relaxed fit perfect for concerts and casual wear.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    {
      id: 2,
      name: "Gyakie Signature Hoodie",
      price: 65,
      image: video1,
      category: "Apparel",
      rating: 4.9,
      reviews: 89,
      description: "Premium hoodie with embroidered logo",
      details: "Premium fleece blend with soft inner lining, kangaroo pocket, and embroidered Gyakie signature logo. Perfect for staying cozy while representing your favorite artist.",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 3,
      name: "My Diary Vinyl Record",
      price: 45,
      image: video1,
      category: "Music",
      rating: 5.0,
      reviews: 67,
      description: "Limited edition vinyl with exclusive artwork",
      details: "180g heavyweight vinyl pressing of the hit album 'My Diary' featuring exclusive alternate cover art and liner notes. Limited to 1000 copies worldwide."
    },
    {
      id: 4,
      name: "Signature Jewelry Set",
      price: 85,
      image: video1,
      category: "Accessories",
      rating: 4.7,
      reviews: 93,
      description: "Elegant gold-plated necklace and earrings",
      details: "Beautifully crafted jewelry set featuring Gyakie's signature 'G' pendant in 18k gold plating with crystal accents. Comes in a luxury gift box."
    },
    {
      id: 5,
      name: "Poster Collection",
      price: 25,
      image: video1,
      category: "Decor",
      rating: 4.6,
      reviews: 156,
      description: "Set of 3 high-quality concert posters",
      details: "Premium glossy finish posters featuring exclusive photography from Gyakie's latest tour. Each poster is 18x24 inches, perfect for framing."
    },
    {
      id: 6,
      name: "Parfum by Gyakie",
      price: 120,
      image: video1,
      category: "Beauty",
      rating: 4.9,
      reviews: 201,
      description: "Signature fragrance with floral notes",
      details: "A sophisticated blend of jasmine, vanilla, and sandalwood created exclusively for Gyakie. 50ml bottle with elegant packaging featuring her signature."
    }
  ];

  // Hotspots positioned over a room scene - spread across wider image
  const hotspots: Hotspot[] = [
    { id: 1, x: 15, y: 65, productId: 1 }, // T-Shirt on left side bed
    { id: 2, x: 8, y: 45, productId: 2 }, // Hoodie on far left chair
    { id: 3, x: 35, y: 75, productId: 3 }, // Vinyl on left nightstand
    { id: 4, x: 65, y: 25, productId: 4 }, // Jewelry on right dresser
    { id: 5, x: 50, y: 20, productId: 5 }, // Posters on center wall
    { id: 6, x: 85, y: 45, productId: 6 }, // Perfume on far right vanity
  ];

  const addToCart = (productId: number, size?: string) => {
    if (products.find(p => p.id === productId)?.sizes && !size) {
      alert("Please select a size");
      return;
    }
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    setSelectedProduct(null);
    setSelectedSize("");
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

  const openProductModal = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedSize(product.sizes ? product.sizes[0] : "");
    }
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      <BackButton />
      
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Header */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2"
              style={{ fontFamily: "Dancing Script, cursive" }}>
            Gyakie's Boutique
          </h1>
          <p className="text-lg text-white/80 hidden md:block">
            Click on the items to explore exclusive merchandise
          </p>
          {isMobile && (
            <p className="text-sm text-white/70 mt-2 px-4">
              Scroll to explore the room and discover products
            </p>
          )}
        </div>

        {/* Cart Summary */}
        {getCartItemCount() > 0 && (
          <div className="fixed top-4 right-4 z-50 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={20} />
              <span>{getCartItemCount()} items - ${getCartTotal()}</span>
            </div>
          </div>
        )}

        {/* Room Scene Background */}
        <div 
          className="relative w-full h-full bg-cover bg-no-repeat transition-all duration-300 ease-out"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.3), rgba(139, 69, 19, 0.2)), 
                             url(${largeDesktopImage})`,
            backgroundSize: isMobile ? '200% 100%' : 'cover',
            backgroundPosition: isMobile ? `${backgroundPosition}% center` : 'center center'
          }}
        >
          {/* Hotspots */}
          {hotspots.map((hotspot) => {
            const product = products.find(p => p.id === hotspot.productId);
            return (
              <button
                key={hotspot.id}
                className="absolute w-6 h-6 bg-pink-500 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50 animate-pulse cursor-pointer z-20"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                }}
                onClick={() => openProductModal(hotspot.productId)}
                title={product?.name}
              >
                <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-full h-full bg-pink-500 rounded-full flex items-center justify-center">
                  <Plus size={12} className="text-white" />
                </div>
              </button>
            );
          })}

          {/* Instructions */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white/80 z-20">
            <div className="flex items-center justify-center space-x-2 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Info size={16} />
              <span className="text-sm">
                {isMobile ? "Scroll to explore • Tap dots for products" : "Click the pink dots to discover products"}
              </span>
            </div>
          </div>
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-white/95 backdrop-blur-sm max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <button
                  className="absolute top-4 left-4 bg-black/20 hover:bg-pink-500 text-white rounded-full p-2 transition-colors"
                  onClick={() => toggleWishlist(selectedProduct.id)}
                >
                  <Heart 
                    size={20} 
                    className={wishlist.has(selectedProduct.id) ? "fill-pink-400 text-pink-400" : ""} 
                  />
                </button>
                <Badge className="absolute bottom-4 left-4 bg-pink-600">
                  {selectedProduct.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-gray-800 text-xl">{selectedProduct.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {selectedProduct.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-pink-600">${selectedProduct.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-700">{selectedProduct.rating}</span>
                    <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{selectedProduct.details}</p>
                
                {selectedProduct.sizes && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
                            selectedSize === size
                              ? 'bg-pink-600 text-white border-pink-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-pink-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={() => addToCart(selectedProduct.id, selectedSize)}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                  {cart[selectedProduct.id] && (
                    <Badge variant="secondary" className="ml-2">
                      {cart[selectedProduct.id]}
                    </Badge>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}