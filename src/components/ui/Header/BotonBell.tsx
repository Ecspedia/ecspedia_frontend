"use client";

import { Bell } from "lucide-react";

export function BotonBell() {
  return (
    <button
      type="button"
      className="p-2 rounded-md text-primary hover:text-secondary transition"
      aria-label="Notificaciones"
    >
      <Bell className="w-6 h-6" />
    </button>
  );
}
