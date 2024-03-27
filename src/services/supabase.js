import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tuazhzxahwqgdxfohjsy.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1YXpoenhhaHdxZ2R4Zm9oanN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3OTA2MTYsImV4cCI6MjAyNTM2NjYxNn0.77nDr3OX4AsEk2JQu0S4zi5LFx79eEsf26vVj0QLpWY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
