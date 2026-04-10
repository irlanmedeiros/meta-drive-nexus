import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_DATE = new Date("2026-10-15T09:00:00-03:00");

export const useEventDate = () => {
  const [eventDate, setEventDate] = useState<Date>(DEFAULT_DATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("event_settings")
        .select("value")
        .eq("key", "event_date")
        .maybeSingle();

      if (data?.value) {
        setEventDate(new Date(data.value));
      }
      setLoading(false);
    };
    void fetch();
  }, []);

  return { eventDate, loading };
};
