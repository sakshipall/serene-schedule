import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl gradient-sage p-12 text-center sm:p-16"
        >
          <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to find your balance?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-primary-foreground/80">
            Join thousands of practitioners who have transformed their wellness routine with Serene Flow.
          </p>
          <Link
            to="/booking"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-all hover:shadow-xl"
          >
            Book Your First Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
