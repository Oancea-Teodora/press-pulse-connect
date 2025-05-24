
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'business' | 'agency';
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [userType, setUserType] = useState<string | null>(null);
  const [checkingUserType, setCheckingUserType] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserType = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setUserType(data.user_type);
        }
        setCheckingUserType(false);
      };
      
      fetchUserType();
    } else {
      setCheckingUserType(false);
    }
  }, [user]);

  if (loading || checkingUserType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && userType !== requiredUserType) {
    // Redirect to appropriate dashboard based on user type
    if (userType === 'business') {
      return <Navigate to="/business/dashboard" replace />;
    } else if (userType === 'agency') {
      return <Navigate to="/agency/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
