import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Clock, User, Filter } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay, addWeeks, subWeeks } from "date-fns";

const instructors = ["All", "Maya Singh", "James Wu", "Sara Patel", "Raj Kumar"];
const sessionTypes = ["All", "Hatha", "Vinyasa", "Meditation", "Restorative"];

interface TimeSlot {
  time: string;
  instructor: string;
  type: string;
  available: boolean;
  popular?: boolean;
}

function generateSlots(date: Date): TimeSlot[] {
  const day = date.getDay();
  const base: TimeSlot[] = [
    { time: "7:00 AM", instructor: "Maya Singh", type: "Hatha", available: true },
    { time: "8:30 AM", instructor: "James Wu", type: "Vinyasa", available: day !== 0, popular: true },
    { time: "10:00 AM", instructor: "Sara Patel", type: "Meditation", available: true },
    { time: "11:30 AM", instructor: "Raj Kumar", type: "Restorative", available: day !== 6 },
    { time: "1:00 PM", instructor: "Maya Singh", type: "Vinyasa", available: false },
    { time: "2:30 PM", instructor: "James Wu", type: "Hatha", available: true, popular: true },
    { time: "4:00 PM", instructor: "Sara Patel", type: "Meditation", available: true },
    { time: "5:30 PM", instructor: "Raj Kumar", type: "Vinyasa", available: day < 5 },
    { time: "7:00 PM", instructor: "Maya Singh", type: "Restorative", available: true },
  ];
  return base;
}

export function BookingCalendar() {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(startOfWeek(today, { weekStartsOn: 1 }));
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [instructorFilter, setInstructorFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [bookingStep, setBookingStep] = useState<"select" | "confirm" | "success">("select");

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const slots = generateSlots(selectedDate);
  const filteredSlots = slots.filter(
    (s) =>
      (instructorFilter === "All" || s.instructor === instructorFilter) &&
      (typeFilter === "All" || s.type === typeFilter)
  );

  const handleBook = () => {
    setBookingStep("confirm");
  };

  const handleConfirm = () => {
    setBookingStep("success");
    setTimeout(() => {
      setBookingStep("select");
      setSelectedSlot(null);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {["Select", "Confirm", "Done"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                i <= ["select", "confirm", "success"].indexOf(bookingStep)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">{step}</span>
            {i < 2 && <div className="mx-1 h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {bookingStep === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success"
            >
              <Check className="h-10 w-10 text-success-foreground" />
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Booking Confirmed!</h3>
            <p className="mt-2 text-muted-foreground">
              Your session has been booked. Check your dashboard for details.
            </p>
          </motion.div>
        ) : bookingStep === "confirm" ? (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-2xl bg-card p-8 soft-shadow"
          >
            <h3 className="font-display text-xl font-bold text-foreground">Confirm Your Booking</h3>
            <div className="mt-6 space-y-4 rounded-xl bg-secondary p-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-foreground">{selectedSlot}</span>
              </div>
              {(() => {
                const slot = slots.find((s) => s.time === selectedSlot);
                return slot ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Instructor</span>
                      <span className="font-medium text-foreground">{slot.instructor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium text-foreground">{slot.type}</span>
                    </div>
                  </>
                ) : null;
              })()}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setBookingStep("select")}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Confirm Booking
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Calendar week navigation */}
            <div className="rounded-2xl bg-card p-6 soft-shadow">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">Select Date</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => setWeekStart(subWeeks(weekStart, 1))}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setWeekStart(addWeeks(weekStart, 1))}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {weekDays.map((day) => {
                  const isSelected = isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, today);
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => { setSelectedDate(day); setSelectedSlot(null); }}
                      className={`flex flex-col items-center gap-1 rounded-xl py-3 text-center transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-md"
                          : isToday
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span className="text-xs font-medium opacity-70">{format(day, "EEE")}</span>
                      <span className="text-lg font-semibold">{format(day, "d")}</span>
                      <span className="text-[10px] opacity-60">{format(day, "MMM")}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="mt-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 overflow-hidden rounded-xl bg-card p-4 soft-shadow"
                  >
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Instructor</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {instructors.map((inst) => (
                            <button
                              key={inst}
                              onClick={() => setInstructorFilter(inst)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                                instructorFilter === inst
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {inst}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Session Type</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {sessionTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => setTypeFilter(type)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                                typeFilter === type
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Time slots */}
            <div className="mt-4 rounded-2xl bg-card p-6 soft-shadow">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Available Slots — {format(selectedDate, "EEEE, MMM d")}
              </h3>
              <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Available</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-border" /> Booked</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warm" /> Popular</span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <motion.button
                      key={slot.time}
                      whileHover={slot.available ? { scale: 1.02 } : {}}
                      whileTap={slot.available ? { scale: 0.98 } : {}}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`relative rounded-xl border p-4 text-left transition-all ${
                        !slot.available
                          ? "cursor-not-allowed border-border bg-muted/50 opacity-50"
                          : isSelected
                            ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                            : "border-border hover:border-primary/30 hover:shadow-sm"
                      }`}
                    >
                      {slot.popular && slot.available && (
                        <span className="absolute -top-2 right-3 rounded-full bg-warm px-2 py-0.5 text-[10px] font-medium text-warm-foreground">
                          Popular
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{slot.time}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {slot.instructor}
                      </div>
                      <span className="mt-1 inline-block rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                        {slot.type}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <button
                    onClick={handleBook}
                    className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90"
                  >
                    Continue with {selectedSlot}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
