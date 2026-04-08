-- Add is_hero_bg field to galeria_media table
ALTER TABLE public.galeria_media 
ADD COLUMN is_hero_bg BOOLEAN NOT NULL DEFAULT false;

-- Index for faster querying of hero background
CREATE INDEX idx_galeria_media_is_hero_bg ON public.galeria_media(is_hero_bg) WHERE is_hero_bg = true;
