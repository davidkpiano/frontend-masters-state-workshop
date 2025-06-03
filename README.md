# Frontend Masters State Workshop

In this workshop, we'll build and evolve a production-ready React application with scalable state management patterns. We'll start with the basics and progressively tackle more complex state challenges by implementing event-driven architecture, handling multiple sources of truth, and optimizing performance.

## Workshop Overview

You'll learn state management principles that can be applied to any application, regardless of framework, size, or complexity. This workshop combines theory with hands-on practice through a series of progressive exercises.

### Key Takeaways

By participating in this workshop, you'll learn to:

- **Architect state management solutions** that scale with application complexity
- **Avoid common React state management pitfalls** and anti-patterns
- **Model state using event-driven patterns** for more predictable applications
- **Balance local, shared, and server state** for optimal performance
- **Debug and troubleshoot complex state issues** efficiently

## Getting Started

### Installation

```bash
# or npm install or yarn install
pnpm install
```

### Development

```bash
# or npm run dev or yarn dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the workshop application.

### Testing

```bash
# or npm test or yarn test
pnpm test
```

## Workshop Schedule & Exercises

- [Exercise: Antipatterns](http://localhost:3000/exercise-antipatterns) [(📃 Code)](./src/app/exercise-antipatterns/page.tsx) - Common React state management mistakes
- [Exercise: Diagrams](http://localhost:3000/exercise-diagrams) [(📃 Code)](./src/app/exercise-diagrams/readme.md) - State visualization techniques
- [Exercise: Finite states](http://localhost:3000/exercise-finite) [(📃 Code)](./src/app/exercise-finite/page.tsx) - Combining state patterns
- [Exercise: Reducers](http://localhost:3000/exercise-reducer) [(📃 Code)](./src/app/exercise-reducer/page.tsx) - Building with `useReducer`
- [Exercise: Forms](http://localhost:3000/exercise-form) [(📃 Code)](./src/app/exercise-form/page.tsx) - Form handling
- [Exercise: URL](http://localhost:3000/exercise-url) [(📃 Code)](./src/app/exercise-url/page.tsx) - URL state synchronization
- [Exercise: Fetch](http://localhost:3000/exercise-fetch) [(📃 Code)](./src/app/exercise-fetch/page.tsx) - Data fetching patterns
- [Exercise: Libraries](http://localhost:3000/exercise-libraries) [(📃 Code)](./src/app/exercise-libraries/page.tsx) - State management libraries
- [Exercise: Normalization](http://localhost:3000/exercise-normalization) [(📃 Code)](./src/app/exercise-normalization/page.tsx) - Data normalization
- [Exercise: Effects](http://localhost:3000/exercise-effects) [(📃 Code)](./src/app/exercise-effects/page.tsx) - Refactoring cascading `useEffect`s
- [Exercise: Sync](http://localhost:3000/exercise-sync) [(📃 Code)](./src/app/exercise-sync/page.tsx) - Synchronization patterns with `useSyncExternalStore`
- [Exercise: Test](http://localhost:3000/exercise-test) [(📃 Code)](./src/app/exercise-test/bookingFlow.test.ts) - Testing state management

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks, XState Store, TanStack Query
- **Database**: SQLite with Drizzle ORM
- **Testing**: Vitest with Testing Library
- **UI Components**: ShadCN (Radix UI primitives)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [XState Store Documentation](https://stately.ai/docs/xstate-store)
- [TanStack Query Documentation](https://tanstack.com/query)

Happy coding! 🚀
