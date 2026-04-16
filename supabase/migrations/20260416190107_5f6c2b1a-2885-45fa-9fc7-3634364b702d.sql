CREATE POLICY "Anyone can update gallery media"
ON public.galeria_media FOR UPDATE
USING (true) WITH CHECK (true);