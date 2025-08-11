'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { getFlightOptions } from '@/app/exerciseUtils';

interface FlightOption {
  id: string;
  airline: string;
  price: number;
  duration: string;
}

function FlightBooking() {
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>([]);
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(
    null
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (selectedFlight) {
      setTotalPrice(selectedFlight.price * passengers);
    }
  }, [selectedFlight, passengers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setIsError(false);
    setIsSuccess(false);
    setSelectedFlight(null);

    try {
      const flights = await getFlightOptions({
        destination,
        departure,
        arrival,
        passengers,
      });

      setFlightOptions(flights);
      setIsSuccess(true);
    } catch {
      setIsSubmitting(false);
      setIsError(true);
    }
  };

  const handleFlightSelect = (flight: FlightOption) => {
    setSelectedFlight(flight);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Flight Booking</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="roundtrip"
            checked={isRoundtrip}
            onCheckedChange={setIsRoundtrip}
          />
          <Label htmlFor="roundtrip">Roundtrip flight</Label>
        </div>

        <div>
          <Label htmlFor="destination" className="block mb-1">
            Destination
          </Label>
          <Input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="departure" className="block mb-1">
            Departure Date
          </Label>
          <Input
            type="date"
            id="departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          />
        </div>

        {isRoundtrip && (
          <div>
            <Label htmlFor="arrival" className="block mb-1">
              Return Date
            </Label>
            <Input
              type="date"
              id="arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <Label htmlFor="passengers" className="block mb-1">
            Number of Passengers
          </Label>
          <Input
            type="number"
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
            min="1"
            max="9"
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Searching...' : 'Search Flights'}
        </Button>
      </form>

      {isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          An error occurred while searching for flights. Please try again.
        </div>
      )}

      {isSuccess && flightOptions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
          <div className="space-y-4">
            {flightOptions.map((flight) => (
              <div
                key={flight.id}
                className={`p-4 border rounded hover:shadow-md ${
                  selectedFlight?.id === flight.id
                    ? 'border-blue-500 bg-blue-50'
                    : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{flight.airline}</h3>
                    <p className="text-gray-600">Duration: {flight.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${flight.price}</p>
                    <Button
                      className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      onClick={() => handleFlightSelect(flight)}
                    >
                      {selectedFlight?.id === flight.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFlight && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
          <div className="space-y-2">
            <p>Flight: {selectedFlight.airline}</p>
            <p>Duration: {selectedFlight.duration}</p>
            <p>Passengers: {passengers}</p>
            <p className="text-xl font-bold mt-4">Total: ${totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <FlightBooking />;
}
