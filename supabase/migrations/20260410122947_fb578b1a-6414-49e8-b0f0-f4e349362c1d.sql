
CREATE TABLE public.event_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read event_settings"
  ON public.event_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert event_settings"
  ON public.event_settings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update event_settings"
  ON public.event_settings FOR UPDATE
  TO anon, authenticated
  USING (true);

INSERT INTO public.event_settings (key, value)
VALUES ('event_date', '2026-10-15T09:00:00-03:00');
