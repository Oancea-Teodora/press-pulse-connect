
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Layout/Navbar";
import { Sidebar } from "@/components/Layout/Sidebar";

export function AgencyDashboard() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/agency/dashboard', icon: '📊' },
    { label: 'Clients', href: '/agency/clients', icon: '👥' },
    { label: 'Active Requests', href: '/agency/requests', icon: '📋' },
    { label: 'Settings', href: '/agency/settings', icon: '⚙️' },
  ];

  const mockUser = { type: 'agency' as const, name: 'Elite PR Solutions' };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={mockUser} />
      <div className="flex">
        <Sidebar items={sidebarItems} userType="agency" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Agency Dashboard</h1>
              <Button>View All Clients</Button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Active Clients</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-sm text-gray-600">Pending Requests</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">15</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">47</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">Acme Corp</div>
                        <div className="text-sm text-gray-600">New request submitted</div>
                      </div>
                      <div className="text-sm text-gray-500">2h ago</div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">TechStart Inc</div>
                        <div className="text-sm text-gray-600">Request approved</div>
                      </div>
                      <div className="text-sm text-gray-500">4h ago</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Global Solutions</div>
                        <div className="text-sm text-gray-600">Press release completed</div>
                      </div>
                      <div className="text-sm text-gray-500">1d ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    📋 Review Pending Requests
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    👥 Manage Clients
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📊 View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    ⚙️ Account Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
