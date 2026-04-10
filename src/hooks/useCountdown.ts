import { useState, useEffect } from "react";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: Date): CountdownValues => {
  const calculate = (): CountdownValues => {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState<CountdownValues>(calculate);

  useEffect(() => {
    const id = setInterval(() => setCountdown(calculate()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return countdown;
};
