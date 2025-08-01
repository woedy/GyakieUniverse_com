import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Instagram, Twitter, Youtube, Music, Award, Globe } from "lucide-react";
import BackButton from "../ui/BackButton";
import video1 from '/images/cover/video1.png';

export default function About() {
  const achievements = [
    { year: "2021", title: "Breakthrough Artist", description: "African Music Awards" },
    { year: "2022", title: "Song of the Year", description: "Ghana Music Awards for 'Forever'" },
    { year: "2023", title: "International Recognition", description: "Billboard Hot 100 Entry" },
    { year: "2024", title: "Global Tour", description: "First World Tour spanning 4 continents" }
  ];

  const stats = [
    { label: "Monthly Listeners", value: "15M+", icon: Music },
    { label: "Awards Won", value: "12", icon: Award },
    { label: "Countries Toured", value: "25+", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 text-white p-6">
      <BackButton />
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">About Gyakie</h1>
          <p className="text-xl text-gray-300">Discover the story behind the music</p>
        </header>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
                  src={video1}
              alt="Gyakie"
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">The Voice of a Generation</h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Gyakie, born Jackline Acheampong, is a Ghanaian afrobeats singer who has taken the world by storm with her soulful voice and captivating melodies. Born and raised in Kumasi, Ghana, she discovered her passion for music at an early age and has since become one of Africa's most promising young talents.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Her breakthrough single "Forever" not only dominated charts across Africa but also gained international recognition, establishing her as a global afrobeats sensation. With her unique blend of contemporary afrobeats and traditional Ghanaian sounds, Gyakie continues to bridge cultures and connect hearts through music.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                <Instagram className="mr-2 h-5 w-5" />
                Follow
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                <Twitter className="mr-2 h-5 w-5" />
                Follow
              </Button>
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                <Youtube className="mr-2 h-5 w-5" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">By the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-black bg-opacity-30 border-purple-400 text-center">
                <CardContent className="p-8">
                  <stat.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Journey to Stardom</h2>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-black bg-opacity-30 border-gray-600 hover:border-purple-400 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-purple-600 text-white text-lg px-4 py-2">
                      {achievement.year}
                    </Badge>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{achievement.title}</h3>
                      <p className="text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Musical Style */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-purple-600 to-fuchsia-600 border-none">
            <CardHeader>
              <CardTitle className="text-white text-center text-3xl">Musical Style</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Influences</h3>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white mr-2">Afrobeats</Badge>
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white mr-2">Highlife</Badge>
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white mr-2">R&B</Badge>
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white mr-2">Soul</Badge>
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white mr-2">Reggae</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Signature Sound</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Gyakie's music is characterized by smooth vocals, melodic hooks, and the perfect fusion of traditional Ghanaian rhythms with contemporary afrobeats production. Her songs often explore themes of love, empowerment, and cultural pride.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section className="text-center mb-8">
          <Card className="bg-black bg-opacity-50 border-purple-400">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Connect with Gyakie</h3>
              <p className="text-gray-300 mb-6">Stay updated with the latest news, music releases, and tour announcements</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                  Book Shows
                </Button>
                <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                  Press Inquiries
                </Button>
                <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                  Collaborations
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
