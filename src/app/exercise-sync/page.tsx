'use client';

import { useSyncExternalStore } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plane, Clock, MapPin } from 'lucide-react';
import { FlightStatus, FlightStore } from './FlightStore';

const flightStore = new FlightStore();

function useFlights() {
  const flights = useSyncExternalStore(
    flightStore.subscribe,
    flightStore.getSnapshot,
    flightStore.getSnapshot
  );

  return flights;
}

function getStatusColor(status: FlightStatus) {
  switch (status) {
    case 'On Time':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Delayed':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Boarding':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Departed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'Cancelled':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Main component
export default function FlightStatusDashboard() {
  const flights = useFlights();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">✈️ Flight Status Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time flight updates using useSyncExternalStore - automatic
          updates every second
        </p>
      </div>

      {/* Flight Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Flight Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flight</TableHead>
                <TableHead>Airline</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Gate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {flight.flightNumber}
                  </TableCell>
                  <TableCell>{flight.airline}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {flight.origin} → {flight.destination}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {flight.scheduledDeparture}
                      {flight.actualDeparture && (
                        <div className="text-xs text-muted-foreground">
                          (Actual: {flight.actualDeparture})
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(flight.status)}>
                      {flight.status}
                      {flight.delay && ` (+${flight.delay}m)`}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {flight.gate && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {flight.gate}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
