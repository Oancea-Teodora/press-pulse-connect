
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Layout/Navbar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'business';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would authenticate with backend
    if (userType === 'business') {
      navigate('/business/dashboard');
    } else {
      navigate('/agency/dashboard');
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
              <Button type="submit" className="w-full">
                Login
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
