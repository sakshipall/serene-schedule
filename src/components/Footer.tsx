import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-sage">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">Serene Flow</span>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Your journey to inner peace begins with a single breath. Book your yoga session today.
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 Serene Flow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
