import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hxedsbvrgndfewrzlynl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4ZWRzYnZyZ25kZmV3cnpseW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0Nzk4OTQsImV4cCI6MTk4MDA1NTg5NH0.Gs7Q8d3bFBN3SZCW-oVRXxpSI4juNCk8YGJvcBGmjXk"



export const supabase = createClient(supabaseUrl, supabaseKey)