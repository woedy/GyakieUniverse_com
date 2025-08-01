import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MapPin, Calendar, Clock, Ticket } from "lucide-react";
import BackButton from "../ui/BackButton";

export default function Tours() {
  const upcomingShows = [
    {
      id: 1,
      date: "2024-03-15",
      time: "8:00 PM",
      venue: "Madison Square Garden",
      city: "New York, NY",
      country: "USA",
      status: "available",
      price: "$75"
    },
    {
      id: 2,
      date: "2024-03-22",
      time: "7:30 PM",
      venue: "The O2 Arena",
      city: "London",
      country: "UK",
      status: "sold-out",
      price: "£65"
    },
    {
      id: 3,
      date: "2024-04-05",
      time: "8:00 PM",
      venue: "Accra Sports Stadium",
      city: "Accra",
      country: "Ghana",
      status: "available",
      price: "₵200"
    },
    {
      id: 4,
      date: "2024-04-18",
      time: "7:00 PM",
      venue: "Sydney Opera House",
      city: "Sydney",
      country: "Australia",
      status: "limited",
      price: "$120"
    }
  ];

  const pastShows = [
    {
      date: "2024-01-20",
      venue: "Apollo Theater",
      city: "Harlem, NY",
      attendance: "1,500"
    },
    {
      date: "2024-02-14",
      venue: "Royal Albert Hall",
      city: "London",
      attendance: "5,272"
    },
    {
      date: "2024-02-28",
      venue: "National Theatre",
      city: "Accra",
      attendance: "2,000"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400';
      case 'limited': return 'text-yellow-400';
      case 'sold-out': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-6">
      <BackButton />
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Tour Dates</h1>
          <p className="text-xl text-gray-300">Join Gyakie live around the world</p>
        </header>

        {/* Upcoming Shows */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Shows</h2>
          <div className="space-y-6">
            {upcomingShows.map((show) => (
              <Card key={show.id} className="bg-black bg-opacity-30 border-gray-600 hover:border-blue-400 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-2 text-blue-400">
                          <Calendar className="h-4 w-4" />
                          <span className="font-semibold">{formatDate(show.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock className="h-4 w-4" />
                          <span>{show.time}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-1">{show.venue}</h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{show.city}, {show.country}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{show.price}</div>
                        <div className={`text-sm font-medium ${getStatusColor(show.status)}`}>
                          {show.status.replace('-', ' ').toUpperCase()}
                        </div>
                      </div>
                      <Button
                        disabled={show.status === 'sold-out'}
                        className={`${
                          show.status === 'sold-out'
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        <Ticket className="mr-2 h-4 w-4" />
                        {show.status === 'sold-out' ? 'Sold Out' : 'Get Tickets'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Shows */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Recent Performances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastShows.map((show, index) => (
              <Card key={index} className="bg-black bg-opacity-30 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white">{show.venue}</CardTitle>
                  <CardDescription className="text-gray-400">{show.city}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(show.date)}</span>
                    </div>
                    <div className="text-gray-300">
                      <span className="font-semibold">{show.attendance}</span> attendees
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 mb-8 text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Never Miss a Show</h3>
              <p className="text-gray-200 mb-6">Subscribe to get notified about new tour dates and exclusive presale access</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border border-white border-opacity-30"
                />
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-200">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
