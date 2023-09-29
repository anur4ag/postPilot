const { createClient } = require("@supabase/supabase-js");

const superbase = createClient(
  "https://nxdgkgadfxeotrqmgpgz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54ZGdrZ2FkZnhlb3RycW1ncGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5Mzk3MTgsImV4cCI6MjAxMTUxNTcxOH0.X3NzXpK928qIUIcUsC4CfFcqgArvmgOfPhdlqikJVUY"
);

module.exports = superbase;
