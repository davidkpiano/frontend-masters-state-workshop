import { test, expect } from 'vitest';
import { initialState, bookingReducer, Step } from './bookingFlow';

test('should be able to book a flight', () => {
  const state = bookingReducer(initialState, { type: 'searchFlights' });
  expect(state.currentStep).toBe(Step.FlightResults);
});
