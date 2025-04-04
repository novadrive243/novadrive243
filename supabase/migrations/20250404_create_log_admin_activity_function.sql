
-- Function to log admin activity
CREATE OR REPLACE FUNCTION public.log_admin_activity(
  p_admin_id UUID,
  p_activity_type TEXT,
  p_details JSONB DEFAULT '{}'::JSONB
)
RETURNS SETOF admin_activity
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public.admin_activity (admin_id, activity_type, details)
  VALUES (p_admin_id, p_activity_type, p_details)
  RETURNING *;
END;
$$;
