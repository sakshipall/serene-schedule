import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, MapPin, X, RotateCcw, History } from "lucide-react";
import { format, addDays } from "date-fns";

interface Booking {
  id: string;
  date: Date;
  time: string;
  instructor: string;
  type: string;
  status: "upcoming" | "completed" | "cancelled";
}

const mockBookings: Booking[] = [
  { id: "1", date: addDays(new Date(), 2), time: "8:30 AM", instructor: "Maya Singh", type: "Vinyasa", status: "upcoming" },
  { id: "2", date: addDays(new Date(), 5), time: "10:00 AM", instructor: "Sara Patel", type: "Meditation", status: "upcoming" },
  { id: "3", date: addDays(new Date(), 8), time: "7:00 PM", instructor: "Raj Kumar", type: "Restorative", status: "upcoming" },
  { id: "4", date: addDays(new Date(), -3), time: "2:30 PM", instructor: "James Wu", type: "Hatha", status: "completed" },
  { id: "5", date: addDays(new Date(), -7), time: "7:00 AM", instructor: "Maya Singh", type: "Vinyasa", status: "completed" },
  { id: "6", date: addDays(new Date(), -10), time: "4:00 PM", instructor: "Sara Patel", type: "Meditation", status: "cancelled" },
];

export function DashboardView() {
  const [bookings, setBookings] = useState(mockBookings);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const upcomingBookings = bookings.filter((b) => b.status === "upcoming");
  const pastBookings = bookings.filter((b) => b.status !== "upcoming");

  const handleCancel = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
  };

  const displayBookings = tab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">My Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Manage your yoga sessions and bookings.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Upcoming", value: upcomingBookings.length, icon: Calendar, color: "bg-primary/10 text-primary" },
          { label: "Completed", value: pastBookings.filter((b) => b.status === "completed").length, icon: History, color: "bg-success/10 text-success" },
          { label: "Total Sessions", value: bookings.length, icon: Clock, color: "bg-warm/30 text-warm-foreground" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-card p-5 soft-shadow">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-secondary p-1">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium capitalize transition-all ${
              tab === t
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "upcoming" ? "Upcoming" : "Past Sessions"}
          </button>
        ))}
      </div>

      {/* Booking cards */}
      <div className="space-y-3">
        {displayBookings.length === 0 ? (
          <div className="rounded-2xl bg-card py-12 text-center soft-shadow">
            <p className="text-muted-foreground">No {tab} sessions found.</p>
          </div>
        ) : (
          displayBookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-card p-5 soft-shadow"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-accent">
                    <span className="text-xs font-medium text-muted-foreground">{format(booking.date, "MMM")}</span>
                    <span className="text-lg font-bold leading-none text-foreground">{format(booking.date, "d")}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{booking.type} Yoga</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{booking.time}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{booking.instructor}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />Studio A</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {booking.status === "upcoming" && (
                    <>
                      <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                        <RotateCcw className="h-3 w-3" />
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="flex items-center gap-1 rounded-lg border border-destructive/20 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <X className="h-3 w-3" />
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status === "completed" && (
                    <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                      Completed
                    </span>
                  )}
                  {booking.status === "cancelled" && (
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
