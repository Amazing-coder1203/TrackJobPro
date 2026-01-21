import { createClient } from '@supabase/supabase-js';

// These are public anon keys meant to be used in the browser.
// They are restricted by Row Level Security (RLS) policies in Supabase.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://kpxtvrhahjyjninzmknm.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtweHR2cmhhaGp5am5pbnpta25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODUzMTgsImV4cCI6MjA4NDU2MTMxOH0.frTE5B76UtFiIa91DKm9n8cQeN4nMmB7Fu4xsM9LUng';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
