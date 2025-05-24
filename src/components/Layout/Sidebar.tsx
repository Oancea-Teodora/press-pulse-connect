
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

interface SidebarProps {
  items: SidebarItem[];
  userType: 'business' | 'agency';
}

export function Sidebar({ items, userType }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {userType === 'business' ? 'Business Dashboard' : 'Agency Dashboard'}
        </h2>
        
        <nav className="space-y-2">
          {items.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  location.pathname === item.href && "bg-blue-50 text-blue-600"
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
