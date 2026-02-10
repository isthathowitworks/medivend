const supabaseUrl = "https://wvkjymvopfgwrkyeeerl.supabase.co";
const supabaseKey = "sb_publishable_3FzbxTLmbmqPbr61VLnY_g_-wHPCurH";

window.supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

console.log("Supabase client initialized:", window.supabaseClient);

// Note: sorry I put an example. Its for privacy thats why