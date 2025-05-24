
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Layout/Navbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'business';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        // Check user type and redirect accordingly
        const userMetadata = data.user.user_metadata;
        if (userMetadata?.user_type === 'business') {
          navigate('/business/dashboard');
        } else if (userMetadata?.user_type === 'agency') {
          navigate('/agency/dashboard');
        } else {
          // Fallback based on URL parameter
          if (userType === 'business') {
            navigate('/business/dashboard');
          } else {
            navigate('/agency/dashboard');
          }
        }
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Login as {userType === 'business' ? 'Business' : 'PR Agency'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link 
                to={`/signup?type=${userType}`} 
                className="text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                to={`/login?type=${userType === 'business' ? 'agency' : 'business'}`}
                className="text-sm text-gray-600 hover:underline"
              >
                Login as {userType === 'business' ? 'PR Agency' : 'Business'}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
