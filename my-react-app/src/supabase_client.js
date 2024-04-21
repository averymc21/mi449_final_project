import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dgvzouuaqkqjqbcxjmgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndnpvdXVhcWtxanFiY3hqbWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTA1MTcsImV4cCI6MjAyOTI4NjUxN30.LM9MDJvkwm0wd_Dxt220waXw6zvtxlU1qIMEwzOYFws';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
