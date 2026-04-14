import { motion } from "framer-motion";
import { CalendarCheck, Sparkles, ShieldCheck, Heart } from "lucide-react";
import studioImage from "@/assets/studio.jpg";

const features = [
  {
    icon: CalendarCheck,
    title: "Effortless Scheduling",
    description: "Pick a date, choose a time, and you're all set. Our intuitive booking flow takes under 90 seconds.",
  },
  {
    icon: Sparkles,
    title: "Personalized Sessions",
    description: "Filter by session type, instructor, and difficulty to find the perfect class for your level.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Instructors",
    description: "Every instructor is certified and reviewed by our community. Your wellness is in safe hands.",
  },
  {
    icon: Heart,
    title: "Wellness Community",
    description: "Join a supportive network of practitioners. Share progress, get inspired, grow together.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium uppercase tracking-widest text-primary"
            >
              Why Serene Flow
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl"
            >
              Booking should feel as calm as the session itself
            </motion.h2>
            <div className="mt-10 space-y-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">
                    <feature.icon className="h-5 w-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl soft-shadow">
              <img
                src={studioImage}
                alt="Serene yoga studio with natural light and plants"
                className="h-full w-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-sage">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">4.9 ★ Rating</p>
                  <p className="text-xs text-muted-foreground">2,400+ sessions booked</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
