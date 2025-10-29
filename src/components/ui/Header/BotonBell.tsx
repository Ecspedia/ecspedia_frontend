'use client';

import { Bell } from "lucide-react";

export function BotonBell() {
  const handleClick = () => {
    // Placeholder for notification functionality
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-2 rounded-md text-primary hover:text-secondary transition"
      aria-label="Notificaciones"
    >
      <Bell className="w-6 h-6" />
    </button>
  );
}
