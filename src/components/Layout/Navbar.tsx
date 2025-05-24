
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  user?: { type: 'business' | 'agency'; name: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout functionality
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">PRConnect</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
