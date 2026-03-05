import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useAuthStore, mockDoctors, mockApplications } from '@/store/authStore';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  LogOut,
  Search,
  MoreHorizontal,
  AlertTriangle,
  Shield,
  Stethoscope,
  Clock,
  Download
} from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export default function AdminPanel({ onLogout, onNavigateHome }: AdminPanelProps) {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = () => {
    setShowApplicationDialog(false);
    setSelectedApplication(null);
    // In real app, would call API to approve
  };

  const handleReject = () => {
    setShowRejectDialog(false);
    setShowApplicationDialog(false);
    setRejectionReason('');
    setSelectedApplication(null);
    // In real app, would call API to reject
  };

  const filteredDoctors = mockDoctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingApplications = mockApplications.filter(app => app.status === 'pending');
  const approvedDoctors = mockDoctors.filter(d => d.verificationStatus === 'approved');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onNavigateHome} className="flex items-center gap-2">
              <img src="/logo.png" alt="CareConnect" className="h-8 w-8" />
              <span className="font-semibold text-gray-900 hidden sm:block">CareConnect</span>
            </button>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <span className="text-gray-600 hidden sm:block">Admin Panel</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium hidden sm:block">{user?.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-4">
              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                  { id: 'applications', label: 'Applications', icon: FileText },
                  { id: 'doctors', label: 'Doctors', icon: UserCheck },
                  { id: 'users', label: 'All Users', icon: Users },
                  { id: 'reports', label: 'Reports', icon: AlertTriangle },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    {item.id === 'applications' && pendingApplications.length > 0 && (
                      <Badge className="ml-auto bg-red-100 text-red-700">{pendingApplications.length}</Badge>
                    )}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Stats Cards */}
                <div className="grid sm:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Doctors</p>
                          <p className="text-3xl font-bold text-gray-900">{mockDoctors.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Verified</p>
                          <p className="text-3xl font-bold text-gray-900">{approvedDoctors.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Pending</p>
                          <p className="text-3xl font-bold text-gray-900">{pendingApplications.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Patients</p>
                          <p className="text-3xl font-bold text-gray-900">1,247</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Applications */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Applications</CardTitle>
                        <CardDescription>Doctor verification requests awaiting review</CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('applications')}
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingApplications.slice(0, 3).map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {application.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{application.name}</p>
                              <p className="text-sm text-gray-500">{application.specialization}</p>
                              <p className="text-xs text-gray-400">Submitted {new Date(application.submittedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowApplicationDialog(true);
                              }}
                            >
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                      {pendingApplications.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                          <p>No pending applications</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">10,432</p>
                        <p className="text-sm text-gray-500">Total Consultations</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">4.8</p>
                        <p className="text-sm text-gray-500">Average Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-purple-600">98%</p>
                        <p className="text-sm text-gray-500">Patient Satisfaction</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Applications</CardTitle>
                  <CardDescription>Review and verify doctor applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pending">
                    <TabsList className="mb-4">
                      <TabsTrigger value="pending">
                        Pending ({pendingApplications.length})
                      </TabsTrigger>
                      <TabsTrigger value="approved">Approved</TabsTrigger>
                      <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="pending" className="space-y-4">
                      {pendingApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {application.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{application.name}</p>
                              <p className="text-sm text-gray-500">{application.specialization}</p>
                              <p className="text-sm text-gray-500">License: {application.licenseNumber}</p>
                              <p className="text-xs text-gray-400">{application.experience} years experience</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowApplicationDialog(true);
                              }}
                            >
                              Review Application
                            </Button>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="approved">
                      <div className="text-center py-12 text-gray-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                        <p>Approved applications will appear here</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="rejected">
                      <div className="text-center py-12 text-gray-500">
                        <XCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                        <p>Rejected applications will appear here</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Doctors Tab */}
            {activeTab === 'doctors' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Doctors</CardTitle>
                      <CardDescription>Manage verified doctors on the platform</CardDescription>
                    </div>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        placeholder="Search doctors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDoctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {doctor.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{doctor.name}</p>
                              {doctor.verificationStatus === 'approved' && (
                                <Badge className="bg-green-100 text-green-700">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{doctor.specialization}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-500">
                                <Star className="w-4 h-4 inline text-amber-400" /> {doctor.rating}
                              </span>
                              <span className="text-sm text-gray-500">
                                {doctor.consultationsCompleted} consultations
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>View and manage platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'John Smith', email: 'john.smith@email.com', role: 'patient', joined: '2024-01-15' },
                      { name: 'Sarah Johnson', email: 'sarah.johnson@careconnect.com', role: 'doctor', joined: '2024-01-10' },
                      { name: 'Michael Chen', email: 'michael.chen@careconnect.com', role: 'doctor', joined: '2024-01-12' },
                      { name: 'Emily Davis', email: 'emily.davis@email.com', role: 'patient', joined: '2024-01-20' },
                    ].map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={user.role === 'doctor' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={user.role === 'doctor' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}>
                            {user.role}
                          </Badge>
                          <span className="text-sm text-gray-500">Joined {new Date(user.joined).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Issues</CardTitle>
                  <CardDescription>Manage user reports and platform issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                          <span className="font-medium">Report #1234</span>
                        </div>
                        <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">Inappropriate behavior during consultation</p>
                      <p className="text-gray-500 text-xs">Reported by: Patient • 2 days ago</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-500" />
                          <span className="font-medium">Report #1233</span>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Resolved</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">Technical issue with video call</p>
                      <p className="text-gray-500 text-xs">Reported by: Doctor • 5 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Application Review Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Doctor Application</DialogTitle>
            <DialogDescription>Verify doctor credentials and approve or reject application</DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                    {selectedApplication.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedApplication.name}</h3>
                  <p className="text-blue-600">{selectedApplication.specialization}</p>
                  <p className="text-gray-500">{selectedApplication.experience} years experience</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Email</Label>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">License Number</Label>
                  <p className="font-medium">{selectedApplication.licenseNumber}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500 mb-2 block">License Document</Label>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-10 h-10 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Medical License.pdf</p>
                    <p className="text-sm text-gray-500">Uploaded on {new Date(selectedApplication.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-900">Verification Required</p>
                    <p className="text-sm text-amber-800">
                      Please verify the license number with the medical board before approval.
                      This doctor will be able to consult patients once approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowApplicationDialog(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={() => setShowRejectDialog(true)}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>Please provide a reason for rejection</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Textarea 
                placeholder="Explain why this application is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
            <Button 
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
