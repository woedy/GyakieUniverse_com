import React from "react";
import { ArrowLeft } from "lucide-react";
import { useScene } from "../../lib/stores/useScene";
import "@fontsource/playfair-display/600.css";

export default function BackButton() {
  const { goBack } = useScene();

  return (
    <button
      onClick={goBack}
      className="fixed top-20 left-4 z-50 bg-purple-900/80 hover:bg-purple-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
      style={{ fontFamily: "Playfair Display, serif" }}
    >
      <ArrowLeft size={20} />
      <span>Back to Universe</span>
    </button>
  );
}