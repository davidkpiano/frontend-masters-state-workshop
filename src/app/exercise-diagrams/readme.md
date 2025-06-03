# Modeling your application

## Core Concepts

### The Power of Quick Documentation

- **Rule**: Document your application's high-level structure and flows, even in simple text format
- **Anti-pattern**: Diving straight into code without modeling the problem domain
- **Best practice**: Create simple diagrams and flows to understand your application before building
- **Benefits**:
  - Clearer understanding of system relationships and boundaries
  - Easier onboarding for new team members
  - Better communication with stakeholders
  - Reduced bugs through upfront thinking
  - Faster development once you understand the problem

### Why Even Quick and Dirty Modeling Matters

Many developers skip documentation and modeling because they think it takes too much time. However, even a simple text-based representation of your application's structure can:

- **Prevent over-engineering**: Understanding the actual requirements prevents building unnecessary features
- **Identify edge cases early**: Thinking through flows reveals scenarios you might miss in code
- **Enable better testing**: Clear state transitions make it obvious what to test
- **Improve refactoring**: Well-documented flows make it safe to change implementation details
- **Reduce technical debt**: Explicit modeling prevents implicit assumptions that become bugs

**Preferred whiteboard**: [tldraw](https://www.tldraw.com/)

### Three Essential Diagrams

You don't need fancy tools or perfect UML. Simple text representations are often more maintainable than complex visual diagrams because they:

- Live alongside your code in version control
- Are easy to update and keep in sync
- Don't require special tools to view or edit
- Force you to think clearly about the problem

## Entity Relationship Diagrams (ERD)

Document your data model and relationships between entities.

**Preferred tool**: [DBDiagram](https://dbdiagram.io/)

**Text-based ERD Example:**

```
# Booking System Entities

## User
- id: string (primary key)
- email: string (unique)
- name: string
- createdAt: datetime

## Flight
- id: string (primary key)
- airline: string
- departure: datetime
- arrival: datetime
- price: number
- availableSeats: number

## Hotel
- id: string (primary key)
- name: string
- location: string
- rating: number (1-5)
- pricePerNight: number

## Booking
- id: string (primary key)
- userId: string (foreign key -> User.id)
- flightId: string (foreign key -> Flight.id)
- hotelId: string (optional, foreign key -> Hotel.id)
- status: enum (pending, confirmed, cancelled)
- totalPrice: number
- createdAt: datetime

# Relationships
- User has many Bookings (1:n)
- Flight has many Bookings (1:n)
- Hotel has many Bookings (1:n)
- Booking belongs to User, Flight, and optionally Hotel
```

## Sequence Diagrams

Document the flow of interactions between different parts of your system.

**Preferred tool**: [Swimlanes](https://swimlanes.io/)

**Text-based Sequence Example:**

```
# Flight Booking Sequence

UI -> flightSearch: searchFlights(criteria)
flightSearch -> UI: show flight options

UI -> hotelSearch: searchHotels(location, dates)
hotelSearch -> UI: show hotel options

UI -> api: createBooking(flight, hotel)
api -> db: save booking
db -> api: booking saved
api -> UI: show confirmation
```

## State Diagrams

Document your application's states and what happens in each one. Think about what the user sees, what data you're storing, and what's happening behind the scenes.

**Preferred tool**: [State.new](https://state.new/)

<details>
<summary>Text-based State Flow Example:</summary>

# Booking Flow States

## Starting Out (idle)

User sees the search form with empty fields. We haven't stored any search data yet.
When they fill out the form and hit search, we move to the searching state and kick off the flight API call.

## Searching for Flights (searching)

User sees a loading spinner while we wait for results. We've saved their search criteria.
We're calling the flights API in the background.
If the API comes back with results, we show the flight options.
If it fails, we show an error message with a retry option.

## Browsing Flights (flightResults)

User sees a list of available flights based on their search. We have the flights data and their original search.
When they pick a flight, we save their selection and automatically start looking for hotels using the flight dates.
They can also go back to search again if they want to change their criteria.

## Looking for Hotels (hotelSearch)

User sees the hotel search form, but it's pre-filled with dates from their selected flight. We have their flight selection saved.
We're calling the hotels API to get options for their destination and dates.
If hotels come back, we show them the options.
They can also skip the hotel booking and go straight to review.

## Browsing Hotels (hotelResults)

User sees hotel options along with a summary of their selected flight. We have both flight and hotel data.
When they pick a hotel, we calculate the total price and move to the review screen.
They can go back to the hotel search if they want to see different options.

## Reviewing the Booking (review)

User sees a summary of their flight and hotel (if selected) with the total price. We have all their selections.
When they confirm, we start the booking process and move to payment.
They can still go back to change their hotel selection.

## Processing the Booking (booking)

User sees a "processing payment" screen. We have all their booking details.
We're calling the booking API and processing their payment in the background.
If everything works, we show them a confirmation.
If something goes wrong, we show an error and let them try again.

## Booking Complete (confirmation)

User sees their booking confirmation with all the details. We have the confirmed booking data.
We also send them a confirmation email behind the scenes.
They can start a new booking if they want to book another trip.

## Something Went Wrong (error)

User sees an error message explaining what happened. We keep their previous data so they don't lose progress.
They can retry their last action or start over completely.
We try to be helpful about what went wrong and how to fix it.

</details>

---

## Exercise: Create Your Application Flow Documentation

**Goal**: Document your booking application's structure and behavior in a `flows.md` file

Instead of diving straight into code, take time to understand and document what you're building. This exercise will help you think through the problem domain and create a reference for future development.

### Your Task:

Create a `flows.md` file in your project that documents:

1. **Entity Relationship Diagram**: What data does your application manage?
2. **Sequence Diagrams**: How do different parts of your system interact?
3. **State Diagrams**: What are the possible states and transitions in your application?

### Implementation Steps:

1. **Create `flows.md`** in your project root or docs folder

2. **Document your entities**:

   - What data does your application store?
   - How are different pieces of data related?
   - What are the primary keys and foreign keys?

3. **Map out your sequences**:

   - What happens when a user searches for flights?
   - How does the booking process work?
   - What API calls are made and in what order?

4. **Define your states**:

   - What are all the possible states of your application?
   - What events cause transitions between states?
   - What side effects happen during transitions?

5. **Use simple text format**:
   - Don't worry about perfect formatting
   - Focus on clarity and completeness
   - Update as you build and learn more

### Success Criteria:

- Clear documentation of your data model and relationships
- Complete sequence flows for major user journeys
- Explicit state definitions with transitions and effects
- Text-based format that's easy to maintain
- Living document that you actually reference and update
- Better understanding of your application before you build it

### Benefits You'll Experience:

- **Faster development**: Less time spent figuring out what to build
- **Fewer bugs**: Edge cases discovered before coding
- **Better testing**: Clear states make test cases obvious
- **Easier onboarding**: New developers can understand the system quickly
- **Confident refactoring**: Well-documented behavior makes changes safer

Remember: The goal isn't perfect diagrams; it's clear thinking about your problem domain!
