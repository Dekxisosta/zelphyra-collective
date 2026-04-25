import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Hero, Perks, EventsCarousel, CategoryCarousel, Featured, Testimonials } from "./sections";
import { Background } from "../shared";
import { Divider } from "./layouts";
import { ErrorComponent, RetryComponent } from "../shared";

export default function Home() {
  return (
    <ErrorBoundary FallbackComponent={({ error }) => <ErrorComponent error={error} />}>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <Perks />
        <EventsCarousel />

        <ErrorBoundary FallbackComponent={({ resetErrorBoundary }) => (
          <RetryComponent errorType="FETCH_ERROR" onRetry={resetErrorBoundary} />
        )}>
          <CategoryCarousel />
        </ErrorBoundary>

        <Divider />

        <ErrorBoundary FallbackComponent={({ resetErrorBoundary }) => (
          <RetryComponent errorType="FETCH_ERROR" onRetry={resetErrorBoundary} />
        )}>
          <Featured />
        </ErrorBoundary>

        <Divider />
        <Testimonials />
        <Background />
      </Suspense>
    </ErrorBoundary>
  );
}