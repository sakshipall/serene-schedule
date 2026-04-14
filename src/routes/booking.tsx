import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingCalendar } from "@/components/BookingCalendar";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Session — Serene Flow" },
      { name: "description", content: "Browse available yoga sessions and book your preferred time slot with our interactive calendar." },
      { property: "og:title", content: "Book a Yoga Session — Serene Flow" },
      { property: "og:description", content: "Browse and book yoga sessions with ease." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">Book a Session</span>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Choose your perfect slot
            </h1>
            <p className="mt-3 text-muted-foreground">
              Select a date, pick a time, and you&apos;re on your way to serenity.
            </p>
          </div>
          <BookingCalendar />
        </div>
      </div>
      <Footer />
    </div>
  );
}
