import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Yoga Practitioner",
    content: "Serene Flow made it incredibly easy to find the perfect yoga class. The booking process is so smooth — I was signed up in less than a minute!",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Meditation Enthusiast",
    content: "I love the flexibility of scheduling. Being able to filter by instructor and session type is exactly what I needed for my wellness routine.",
    rating: 5,
  },
  {
    name: "Anika Patel",
    role: "Wellness Coach",
    content: "As an instructor, the admin tools are fantastic. Managing my sessions and viewing bookings has never been easier. Highly recommend!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">Testimonials</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Loved by our community
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-card p-6 soft-shadow"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-warm text-warm" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.content}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
