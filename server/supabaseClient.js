const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://efbmjatmnvbcarscavyy.supabase.co";
const supabaseAPIKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmYm1qYXRtbnZiY2Fyc2Nhdnl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjMyMTMzOCwiZXhwIjoyMDMxODk3MzM4fQ.gQPy4mjrWdCr4RWNiRN_ylMKigE1z3ZKKPWwuFkH9VQ";

exports.supabaseJWT =
  "I/juTYFdkSHfGnpmtgU8CqX0Uo65WBz4t62v67nuvnTH/Gp9NYT0ppZYbSwPa6Vpl0bm6SAcOPkbjYv1aqQwng==";

exports.supabaseUrl = supabaseUrl;
exports.supabaseApiKey = supabaseUrl;
exports.supabase = createClient(supabaseUrl, supabaseAPIKey);
