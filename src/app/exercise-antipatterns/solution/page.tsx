'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Example 1: Filtered Destinations
function FilteredDestinations() {
  const [destinations] = useState([
    { id: 1, name: 'Paris', country: 'France', rating: 4.5 },
    { id: 2, name: 'Tokyo', country: 'Japan', rating: 4.8 },
    { id: 3, name: 'New York', country: 'USA', rating: 4.3 },
  ]);
  const [filterRating, setFilterRating] = useState(4.5);

  const filteredDestinations = destinations.filter(
    (dest) => dest.rating >= filterRating
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtered Destinations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="rating-filter">
            Destinations with Rating ≥ {filterRating}
          </Label>
          <Input
            id="rating-filter"
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="mt-2"
          />
        </div>
        <div className="space-y-2">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <span className="font-medium">{dest.name}</span>
              <Badge variant="secondary">{dest.rating} stars</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Example 2: Trip Summary
function TripSummary() {
  const [tripItems] = useState([
    { id: 1, name: 'Flight', cost: 500 },
    { id: 2, name: 'Hotel', cost: 300 },
    { id: 3, name: 'Activities', cost: 200 },
  ]);

  const totalCost = tripItems.reduce((sum, item) => sum + item.cost, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {tripItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span>{item.name}</span>
              <Badge variant="outline">${item.cost}</Badge>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total Cost:</span>
          <Badge className="text-base">${totalCost}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Example 3: Available Dates
function AvailableDates() {
  const [bookedDates] = useState(['2024-06-01', '2024-06-02', '2024-06-03']);

  const allDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date('2024-06-01');
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });
  const availableDates = allDates.filter((date) => !bookedDates.includes(date));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
          {availableDates.slice(0, 15).map((date) => (
            <Badge
              key={date}
              variant="outline"
              className="text-xs justify-center py-1"
            >
              {date.split('-')[2]}
            </Badge>
          ))}
          {availableDates.length > 15 && (
            <Badge variant="secondary" className="text-xs justify-center py-1">
              +{availableDates.length - 15} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Example 4: Trip Status
function TripStatus() {
  const [trip] = useState({
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    isPaid: true,
    isConfirmed: true,
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const today = new Date();
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);

    if (!trip.isPaid) setStatus('Payment Pending');
    else if (!trip.isConfirmed) setStatus('Awaiting Confirmation');
    else if (today < start) setStatus('Upcoming');
    else if (today >= start && today <= end) setStatus('In Progress');
    else setStatus('Completed');
  }, [trip]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Payment Pending':
      case 'Awaiting Confirmation':
        return 'destructive' as const;
      case 'In Progress':
        return 'default' as const;
      case 'Upcoming':
        return 'secondary' as const;
      case 'Completed':
        return 'outline' as const;
      default:
        return 'secondary' as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Status:</span>
          <Badge variant={getStatusVariant(status)} className="text-sm">
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Example 5: Search Results
function SearchResults() {
  const [searchResults] = useState([
    { id: 1, name: 'Beach Resort', price: 200, rating: 4.5 },
    { id: 2, name: 'Mountain Lodge', price: 150, rating: 4.2 },
    { id: 3, name: 'City Hotel', price: 180, rating: 4.7 },
  ]);
  const [sortBy, setSortBy] = useState('price');
  const [sortedResults, setSortedResults] = useState<typeof searchResults>([]);

  useEffect(() => {
    const sorted = [...searchResults].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return b.rating - a.rating;
    });
    setSortedResults(sorted);
  }, [searchResults, sortBy]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="sort-select">Sort by:</Label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full mt-1 p-2 border border-input bg-background rounded-md text-sm"
          >
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
        <div className="space-y-2">
          {sortedResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
            >
              <div>
                <span className="font-medium">{result.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    ${result.price}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {result.rating} stars
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Example 6: Booking Timer
function BookingTimer() {
  const [timeLeft, setTimeLeft] = useState(300);
  // const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerIdRef.current) clearInterval(timerIdRef.current);

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          timerIdRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerIdRef.current = id;
  };

  const stopTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-mono font-bold">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          <Badge
            variant={timeLeft > 60 ? 'secondary' : 'destructive'}
            className="mt-2"
          >
            Time remaining
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button onClick={startTimer} className="flex-1">
            Start Timer
          </Button>
          <Button onClick={stopTimer} variant="outline" className="flex-1">
            Stop Timer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Example 7: Scroll Position Tracker
function HotelGallery() {
  const [images] = useState([
    'hotel-lobby.jpg',
    'hotel-room.jpg',
    'hotel-pool.jpg',
    'hotel-restaurant.jpg',
  ]);
  // const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const lastScrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;

      // setLastScrollPosition(currentPosition);
      lastScrollPositionRef.current = currentPosition;

      if (currentPosition > lastScrollPositionRef.current) {
        console.log('Scrolling down');
      } else {
        console.log('Scrolling up');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hotel Gallery</CardTitle>
        <CardDescription>
          ❌ Problem: Using useState for scroll position when useRef should be
          used (tracking only)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border"
            >
              <span className="text-sm text-muted-foreground">{image}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Debug: Last scroll position: {lastScrollPositionRef.current}px
        </div>
      </CardContent>
    </Card>
  );
}

// Example 8: Search Analytics
function FlightSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    Array<{ id: number; flight: string; price: number }>
  >([]);
  const [searchCount, setSearchCount] = useState(0);
  const [lastSearchTime, setLastSearchTime] = useState<number | null>(null);

  const handleSearch = async () => {
    const now = Date.now();

    // Track search analytics (doesn't affect UI)
    setSearchCount((prev) => prev + 1); // ❌ Unnecessary re-render
    setLastSearchTime(now); // ❌ Unnecessary re-render

    // Simulate API call
    setTimeout(() => {
      setSearchResults([
        { id: 1, flight: 'NYC -> LAX', price: 299 },
        { id: 2, flight: 'NYC -> SFO', price: 349 },
      ]);
    }, 1000);

    // Analytics logic that doesn't need to trigger re-renders
    if (lastSearchTime && now - lastSearchTime < 1000) {
      console.log('User is searching too quickly');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flights..."
            className="flex-1"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <span className="font-medium">{result.flight}</span>
                <Badge variant="outline">${result.price}</Badge>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-muted-foreground border-t pt-2">
          Debug: Search count: {searchCount}, Last search: {lastSearchTime}
        </div>
      </CardContent>
    </Card>
  );
}

// Example 9: Hotel Selection
function HotelSelection() {
  const [hotels] = useState([
    {
      id: 'h1',
      name: 'Grand Palace Hotel',
      city: 'Paris',
      price: 350,
      amenities: ['WiFi', 'Pool', 'Spa'],
    },
    {
      id: 'h2',
      name: 'Mountain View Lodge',
      city: 'Denver',
      price: 180,
      amenities: ['WiFi', 'Parking'],
    },
    {
      id: 'h3',
      name: 'Beachfront Resort',
      city: 'Miami',
      price: 420,
      amenities: ['WiFi', 'Pool', 'Beach Access'],
    },
  ]);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotelId(hotelId);
  };

  const selectedHotel = hotels.find((hotel) => hotel.id === selectedHotelId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hotel Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedHotel?.id === hotel.id
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-accent'
              }`}
              onClick={() => handleHotelSelect(hotel.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{hotel.name}</span>
                  <div className="text-sm text-muted-foreground">
                    {hotel.city}
                  </div>
                </div>
                <Badge variant="outline">${hotel.price}/night</Badge>
              </div>
            </div>
          ))}
        </div>

        {selectedHotel && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Selected Hotel Details</h4>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedHotel.name}
              </p>
              <p>
                <strong>City:</strong> {selectedHotel.city}
              </p>
              <p>
                <strong>Price:</strong> ${selectedHotel.price}/night
              </p>
              <div className="flex gap-1 flex-wrap">
                {selectedHotel.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="destructive" className="text-xs">
                Storing entire object with {Object.keys(selectedHotel).length}{' '}
                properties
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Example 10: User Profile Data
function TravelPreferences() {
  const [userProfile] = useState({
    id: 'user123',
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      budget: 'medium',
      travelStyle: 'adventure',
      accommodationType: 'hotel',
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">
              Profile Data (Original)
            </Label>
            <div className="mt-1 space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {userProfile.name}
              </p>
              <p>
                <strong>Email:</strong> {userProfile.email}
              </p>
              <p>
                <strong>Budget:</strong> {userProfile.preferences.budget}
              </p>
              <p>
                <strong>Style:</strong> {userProfile.preferences.travelStyle}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">
              Redundant State (Copy)
            </Label>
            <div className="mt-1 space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {userProfile.name}
              </p>
              <p>
                <strong>Email:</strong> {userProfile.email}
              </p>
              <p>
                <strong>Budget:</strong> {userProfile.preferences.budget}
              </p>
              <p>
                <strong>Style:</strong> {userProfile.preferences.travelStyle}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="destructive" className="text-xs">
            4 unnecessary state variables
          </Badge>
          <Badge variant="destructive" className="text-xs">
            4 unnecessary useEffect calls
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Example 11: Booking Summary
function BookingSummary() {
  const [bookingData] = useState({
    flightId: 'FL123',
    hotelId: 'HT456',
    departureDate: '2024-06-15',
    returnDate: '2024-06-22',
    passengers: 2,
    flightPrice: 599,
    hotelPrice: 150,
    taxes: 89,
  });

  const [formattedDepartureDate, setFormattedDepartureDate] = useState('');
  const [formattedReturnDate, setFormattedReturnDate] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const [totalFlightCost, setTotalFlightCost] = useState(0);
  const [totalHotelCost, setTotalHotelCost] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const depDate = new Date(bookingData.departureDate);
    const retDate = new Date(bookingData.returnDate);

    setFormattedDepartureDate(
      depDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );
    setFormattedReturnDate(
      retDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );

    const diffTime = retDate.getTime() - depDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTripDuration(`${diffDays} days`);

    setTotalFlightCost(bookingData.flightPrice * bookingData.passengers);
    setTotalHotelCost(bookingData.hotelPrice * diffDays);
    setGrandTotal(
      bookingData.flightPrice * bookingData.passengers +
        bookingData.hotelPrice * diffDays +
        bookingData.taxes
    );
  }, [bookingData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Raw Data</h4>
            <div className="text-sm space-y-1">
              <p>Departure: {bookingData.departureDate}</p>
              <p>Return: {bookingData.returnDate}</p>
              <p>Passengers: {bookingData.passengers}</p>
              <p>Flight Price: ${bookingData.flightPrice}</p>
              <p>Hotel/night: ${bookingData.hotelPrice}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Redundant Formatted Data</h4>
            <div className="text-sm space-y-1">
              <p>Departure: {formattedDepartureDate}</p>
              <p>Return: {formattedReturnDate}</p>
              <p>Duration: {tripDuration}</p>
              <p>Total Flight: ${totalFlightCost}</p>
              <p>Total Hotel: ${totalHotelCost}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="font-semibold">
            Grand Total (from redundant state):
          </span>
          <Badge className="text-base">${grandTotal}</Badge>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="destructive" className="text-xs">
            6 unnecessary state variables
          </Badge>
          <Badge variant="destructive" className="text-xs">
            Complex useEffect with multiple calculations
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          State Management Anti-patterns
        </h1>
      </div>

      <div className="space-y-8">
        <div>
          <div className="grid gap-6 md:grid-cols-2">
            <FilteredDestinations />
            <TripSummary />
            <AvailableDates />
            <TripStatus />
            <div className="md:col-span-2">
              <SearchResults />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div>
          <div className="grid gap-6 md:grid-cols-2">
            <BookingTimer />
            <HotelGallery />
            <div className="md:col-span-2">
              <FlightSearch />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div>
          <div className="grid gap-6 md:grid-cols-2">
            <HotelSelection />
            <TravelPreferences />
            <div className="md:col-span-2">
              <BookingSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
