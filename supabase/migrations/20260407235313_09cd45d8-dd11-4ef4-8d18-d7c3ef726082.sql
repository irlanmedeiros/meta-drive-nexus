
-- Create galeria_media table
CREATE TABLE public.galeria_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
  url TEXT NOT NULL,
  label TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.galeria_media ENABLE ROW LEVEL SECURITY;

-- Everyone can view media
CREATE POLICY "Anyone can view gallery media"
  ON public.galeria_media FOR SELECT
  USING (true);

-- Anyone can insert (admin panel uses hardcoded credentials, no auth)
CREATE POLICY "Anyone can insert gallery media"
  ON public.galeria_media FOR INSERT
  WITH CHECK (true);

-- Anyone can delete
CREATE POLICY "Anyone can delete gallery media"
  ON public.galeria_media FOR DELETE
  USING (true);

-- Create storage bucket for gallery
INSERT INTO storage.buckets (id, name, public)
VALUES ('galeria', 'galeria', true);

-- Public read access to galeria bucket
CREATE POLICY "Public read access to galeria"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'galeria');

-- Allow uploads to galeria bucket
CREATE POLICY "Allow uploads to galeria"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'galeria');

-- Allow deletes from galeria bucket
CREATE POLICY "Allow deletes from galeria"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'galeria');
