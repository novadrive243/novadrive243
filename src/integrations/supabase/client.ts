// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rkcxuroozvutmilzwjcf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrY3h1cm9venZ1dG1pbHp3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMjgzODksImV4cCI6MjA1ODkwNDM4OX0.Msq_SG4DWpsapiyzftTHHEBiHtp62EPOsrnH9Eg22hE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);