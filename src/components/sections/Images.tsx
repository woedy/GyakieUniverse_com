import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Download, Heart } from "lucide-react";
import BackButton from "../ui/BackButton";

export default function Images() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const images = [
    { id: 1, src: "https://via.placeholder.com/600x400/FF6B6B/FFFFFF?text=Gyakie+1", category: "Concert" },
    { id: 2, src: "https://via.placeholder.com/600x400/4ECDC4/FFFFFF?text=Gyakie+2", category: "Portrait" },
    { id: 3, src: "https://via.placeholder.com/600x400/45B7D1/FFFFFF?text=Gyakie+3", category: "Behind the Scenes" },
    { id: 4, src: "https://via.placeholder.com/600x400/FFA07A/FFFFFF?text=Gyakie+4", category: "Concert" },
    { id: 5, src: "https://via.placeholder.com/600x400/DDA0DD/FFFFFF?text=Gyakie+5", category: "Portrait" },
    { id: 6, src: "https://via.placeholder.com/600x400/FFD700/FFFFFF?text=Gyakie+6", category: "Behind the Scenes" },
    { id: 7, src: "https://via.placeholder.com/600x400/98FB98/FFFFFF?text=Gyakie+7", category: "Concert" },
    { id: 8, src: "https://via.placeholder.com/600x400/F0E68C/FFFFFF?text=Gyakie+8", category: "Portrait" }
  ];

  const categories = ["All", "Concert", "Portrait", "Behind the Scenes"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 text-white p-6">
      <BackButton />
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-gray-300">Explore Gyakie's visual journey</p>
        </header>

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
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="bg-black bg-opacity-30 border-gray-600 overflow-hidden group cursor-pointer">
              <div className="relative">
                <img
                  src={image.src}
                  alt={`Gyakie ${image.id}`}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  onClick={() => openLightbox(image.id)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image.id);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {image.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeLightbox}>
            <div className="relative max-w-4xl max-h-4xl" onClick={(e) => e.stopPropagation()}>
              <img
                src={filteredImages.find(img => img.id === selectedImage)?.src}
                alt="Selected"
                className="max-w-full max-h-full object-contain"
              />
              <Button
                className="absolute top-4 right-4 bg-black bg-opacity-50"
                onClick={closeLightbox}
              >
                ✕
              </Button>
              <Button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50"
                onClick={prevImage}
              >
                <ChevronLeft />
              </Button>
              <Button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50"
                onClick={nextImage}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
