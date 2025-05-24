import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Layout/Navbar";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Link } from "react-router-dom";

export function AgencyClients() {
  const sidebarItems = [
    { label: 'Dashboard', href: '/agency/dashboard', icon: '📊' },
    { label: 'Clients', href: '/agency/clients', icon: '👥' },
    { label: 'Active Requests', href: '/agency/requests', icon: '📋' },
    { label: 'Settings', href: '/agency/settings', icon: '⚙️' },
  ];

  const mockClients = [
    { id: 1, name: 'Acme Corp', industry: 'Technology', joined: '2024-01-15', status: 'Active' },
    { id: 2, name: 'TechStart Inc', industry: 'Software', joined: '2024-02-20', status: 'Active' },
    { id: 3, name: 'Global Solutions', industry: 'Consulting', joined: '2024-03-10', status: 'Active' },
    { id: 4, name: 'Innovation Labs', industry: 'R&D', joined: '2024-03-25', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar items={sidebarItems} userType="agency" />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Clients</h1>
              <div className="flex gap-4">
                <Input placeholder="Search clients..." className="w-64" />
                <Button>Generate Invite Code</Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {mockClients.map((client) => (
                <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <span className={`px-2 py-1 rounded text-xs ${
                        client.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Industry: {client.industry}</div>
                      <div>Joined: {new Date(client.joined).toLocaleDateString()}</div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button asChild size="sm" className="w-full">
                        <Link to={`/agency/client/${client.id}`}>View Dashboard</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Contact Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
