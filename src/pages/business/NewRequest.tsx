
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Layout/Navbar";
import { Sidebar } from "@/components/Layout/Sidebar";
import { useState } from "react";

export function NewRequest() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prTitle: '',
    prBody: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const sidebarItems = [
    { label: 'Dashboard', href: '/business/dashboard', icon: '📊' },
    { label: 'New Request', href: '/business/new-request', icon: '➕' },
    { label: 'Request History', href: '/business/history', icon: '📋' },
    { label: 'Settings', href: '/business/settings', icon: '⚙️' },
  ];

  const mockUser = { type: 'business' as const, name: 'Acme Corp' };

  const mockOutlets = [
    'TechCrunch', 'Forbes', 'Business Insider', 'Reuters', 'Associated Press',
    'CNN Business', 'Bloomberg', 'Wall Street Journal', 'The New York Times'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const toggleOutlet = (outlet: string) => {
    setSelectedOutlets(prev => 
      prev.includes(outlet) 
        ? prev.filter(o => o !== outlet)
        : [...prev, outlet]
    );
  };

  const handleSubmit = () => {
    console.log('Submitting request:', { formData, uploadedFiles, selectedOutlets });
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={mockUser} />
      <div className="flex">
        <Sidebar items={sidebarItems} userType="business" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">New PR Request</h1>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Request Title</Label>
                        <Input 
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="e.g., Product Launch Announcement"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input 
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Brief description of the request"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="prTitle">Press Release Title</Label>
                      <Input 
                        id="prTitle"
                        value={formData.prTitle}
                        onChange={(e) => setFormData({...formData, prTitle: e.target.value})}
                        placeholder="Title for the press release"
                      />
                    </div>

                    <div>
                      <Label htmlFor="prBody">Press Release Body</Label>
                      <Textarea 
                        id="prBody"
                        value={formData.prBody}
                        onChange={(e) => setFormData({...formData, prBody: e.target.value})}
                        placeholder="Write your press release content here..."
                        rows={8}
                      />
                    </div>

                    <div>
                      <Label htmlFor="media">Upload Media Files</Label>
                      <Input 
                        id="media"
                        type="file"
                        multiple
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="mt-2"
                      />
                      
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium">Uploaded Files:</h4>
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <span className="text-sm">{file.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-600"
                              >
                                Delete
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>Select News Outlets</Label>
                      <div className="mt-2 space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                        {mockOutlets.map((outlet) => (
                          <label key={outlet} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedOutlets.includes(outlet)}
                              onChange={() => toggleOutlet(outlet)}
                              className="rounded"
                            />
                            <span className="text-sm">{outlet}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Outlets ({selectedOutlets.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedOutlets.map((outlet) => (
                        <div key={outlet} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                          <span className="text-sm font-medium">{outlet}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleOutlet(outlet)}
                            className="text-red-600"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowDiscardModal(true)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Submit Request
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
