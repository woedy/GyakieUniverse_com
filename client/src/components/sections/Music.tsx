import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";  
import { Play, Pause, Download } from "lucide-react";
import { useState } from "react";
import BackButton from "../ui/BackButton";

export default function Music() {
  const [playing, setPlaying] = useState<string | null>(null);

  const albums = [
    {
      id: 1,
      title: "Forever",
      year: "2021",
      cover: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Forever",
      tracks: [
        { name: "Forever", duration: "3:24" },
        { name: "Something", duration: "3:45" },
        { name: "Whine", duration: "3:12" }
      ]
    },
    {
      id: 2,
      title: "My Diary",
      year: "2022",
      cover: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=My+Diary",
      tracks: [
        { name: "Flames", duration: "3:18" },
        { name: "Something", duration: "3:33" },
        { name: "Come Back", duration: "3:41" }
      ]
    }
  ];

  const handlePlayPause = (trackId: string) => {
    if (playing === trackId) {
      setPlaying(null);
    } else {
      setPlaying(trackId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <BackButton />
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Music</h1>
          <p className="text-xl text-gray-300">Discover Gyakie's musical journey</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {albums.map((album) => (
            <Card key={album.id} className="bg-black bg-opacity-30 border-gray-600">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-white text-2xl">{album.title}</CardTitle>
                    <CardDescription className="text-gray-400">{album.year}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {album.tracks.map((track, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-all">
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handlePlayPause(`${album.id}-${index}`)}
                          className="text-white hover:bg-white hover:bg-opacity-20"
                        >
                          {playing === `${album.id}-${index}` ? <Pause /> : <Play />}
                        </Button>
                        <span className="font-medium">{track.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">{track.duration}</span>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Latest Singles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Need Me", "Rent Free", "Something"].map((single, index) => (
              <Card key={index} className="bg-black bg-opacity-30 border-gray-600 hover:border-purple-400 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-full h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{single}</h3>
                  <p className="text-gray-400">Latest Release</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
