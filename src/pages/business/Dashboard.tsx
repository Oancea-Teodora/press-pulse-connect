import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Layout/Navbar";
import { Sidebar } from "@/components/Layout/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";

export function BusinessDashboard() {
  const [linkStatus, setLinkStatus] = useState<'unlinked' | 'pending' | 'approved'>('unlinked');
  const [inviteCode, setInviteCode] = useState('');

  const sidebarItems = [
    { label: 'Dashboard', href: '/business/dashboard', icon: '📊' },
    { label: 'New Request', href: '/business/new-request', icon: '➕' },
    { label: 'Request History', href: '/business/history', icon: '📋' },
    { label: 'Settings', href: '/business/settings', icon: '⚙️' },
  ];

  const mockUser = { type: 'business' as const, name: 'Acme Corp' };

  const handleSubmitInviteCode = () => {
    setLinkStatus('pending');
  };

  const handleCancelRequest = () => {
    setLinkStatus('unlinked');
    setInviteCode('');
  };

  const renderContent = () => {
    switch (linkStatus) {
      case 'unlinked':
        return (
          <Card className="max-w-md mx-auto mt-12">
            <CardHeader className="text-center">
              <CardTitle>🔗 Connect with a PR Agency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                You're not currently linked to any PR agency. Enter an invite code to get started.
              </p>
              <div className="space-y-3">
                <Input
                  placeholder="Enter PR Agency invite code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
                <Button 
                  onClick={handleSubmitInviteCode} 
                  className="w-full"
                  disabled={!inviteCode.trim()}
                >
                  Submit Request
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'pending':
        return (
          <Card className="max-w-md mx-auto mt-12">
            <CardHeader className="text-center">
              <CardTitle>⏳ Waiting for Approval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-gray-600">
                Your request has been sent to the PR agency. Please wait for their confirmation.
              </p>
              <Button variant="outline" onClick={handleCancelRequest}>
                Cancel Request
              </Button>
            </CardContent>
          </Card>
        );

      case 'approved':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Button asChild>
                <Link to="/business/new-request">New Request</Link>
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">Product Launch Announcement</h3>
                            <p className="text-sm text-gray-600">Submitted 2 days ago</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            Completed
                          </span>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">CEO Interview Coverage</h3>
                            <p className="text-sm text-gray-600">Submitted 5 days ago</p>
                          </div>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                            In Progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>PR Agency</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Elite PR Solutions</h3>
                      <p className="text-sm text-gray-600">Connected since Jan 2024</p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Contact Info
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-red-600">
                        Unlink Agency
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar items={sidebarItems} userType="business" />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
