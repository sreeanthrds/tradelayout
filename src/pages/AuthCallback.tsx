
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log('Auth callback page loaded, redirecting to app');
    
    // Just redirect to the app - we're not using OAuth anymore
    toast({
      title: 'Authentication Successful',
      description: 'You have been signed in successfully.',
    });
    
    navigate('/app');
  }, [navigate, toast]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold mb-2">Completing Sign In</h2>
        <p className="text-muted-foreground">Please wait while we redirect you...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
