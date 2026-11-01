import { useEffect, useState } from "react";

const LOCATION = "New Delhi";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
}

/**
 * Small "where I am, what time it is" status line. The time is filled in
 * after mount so the prerendered markup and the first client render match.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <p className="profile-status">
      <span className="profile-status-dot" aria-hidden="true" />
      <span>{LOCATION}</span>
      <span className="profile-status-sep" aria-hidden="true">
        ·
      </span>
      <span suppressHydrationWarning>{time ?? "—"}</span>
    </p>
  );
}
