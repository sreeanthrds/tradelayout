
/**
 * Utility functions for environment-related checks
 */

/**
 * Check if Supabase is properly configured with required environment variables
 */
export const isSupabaseConfigured = (): boolean => {
  try {
    // We now only need the anon key since we're hardcoding the URL
    const hasConfig = !!import.meta.env.VITE_SUPABASE_ANON_KEY;
    console.log('Supabase configuration check:', hasConfig ? 'Configured' : 'Not configured');
    return hasConfig;
  } catch (error) {
    console.error('Error checking Supabase configuration:', error);
    return false;
  }
};

/**
 * Get the current environment status for Supabase
 */
export const getSupabaseStatus = (): { configured: boolean; message: string } => {
  const isConfigured = isSupabaseConfigured();
  
  return {
    configured: isConfigured,
    message: isConfigured 
      ? "Connected to Supabase - Google OAuth enabled"
      : "Running in development mode with mock authentication. To use real Google authentication, create a .env file with VITE_SUPABASE_ANON_KEY."
  };
};

/**
 * Log a warning if Supabase is not configured
 */
export const warnIfSupabaseNotConfigured = (): void => {
  try {
    if (!isSupabaseConfigured()) {
      console.warn(`
        -------------------------------------------------
        Supabase not properly configured for authentication
        -------------------------------------------------
        To use real Google authentication:
        1. Create a .env file in the project root
        2. Add VITE_SUPABASE_ANON_KEY=your_anon_key
        3. Restart your development server
        -------------------------------------------------
      `);
    }
  } catch (error) {
    console.error('Error in warnIfSupabaseNotConfigured:', error);
  }
};
