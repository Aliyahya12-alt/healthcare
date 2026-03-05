import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuthStore, mockAppointments, mockReviews } from '@/store/authStore';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  User, 
  FileText,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  LogOut,
  Send,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';

interface DoctorDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export default function DoctorDashboard({ onLogout, onNavigateHome }: DoctorDashboardProps) {
  const { user, doctorProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessage, setChatMessage] = useState('');

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'patient', name: 'John Smith', message: 'Hello Dr. Johnson, I have been having headaches for the past week.', time: '10:00 AM' },
    { id: '2', sender: 'doctor', name: 'Dr. Sarah Johnson', message: 'Hello John. I am sorry to hear that. Can you describe the pain - is it throbbing, dull, or sharp?', time: '10:02 AM' },
    { id: '3', sender: 'patient', name: 'John Smith', message: 'It is mostly a dull ache, and it gets worse in the afternoon.', time: '10:05 AM' },
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessages([...chatMessages, {
      id: Date.now().toString(),
      sender: 'doctor',
      name: 'Dr. Sarah Johnson',
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatMessage('');
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100"><AlertCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return null;
    }
  };

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
            <span className="text-gray-600 hidden sm:block">Doctor Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {user?.name?.charAt(0) || 'D'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">{doctorProfile?.specialization}</p>
              </div>
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
                  { id: 'profile', label: 'Profile & Verification', icon: User },
                  { id: 'appointments', label: 'Appointments', icon: Calendar },
                  { id: 'messages', label: 'Messages', icon: MessageSquare },
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
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Consultations</p>
                          <p className="text-3xl font-bold text-gray-900">{doctorProfile?.consultationsCompleted || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Average Rating</p>
                          <p className="text-3xl font-bold text-gray-900">{doctorProfile?.rating || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Star className="w-6 h-6 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Reviews</p>
                          <p className="text-3xl font-bold text-gray-900">{doctorProfile?.reviewCount || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {appointment.patientName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{appointment.patientName}</p>
                              <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                            </div>
                          </div>
                          <Badge className={
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            appointment.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }>
                            {appointment.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Reviews */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockReviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.patientName}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profile & Verification</CardTitle>
                      <CardDescription>Manage your profile and verification status</CardDescription>
                    </div>
                    {getVerificationBadge(doctorProfile?.verificationStatus || 'pending')}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input value={doctorProfile?.name || ''} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={doctorProfile?.email || ''} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Specialization</Label>
                      <Input value={doctorProfile?.specialization || ''} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Years of Experience</Label>
                      <Input value={doctorProfile?.experience || ''} readOnly />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>License Number</Label>
                      <Input value={doctorProfile?.licenseNumber || ''} readOnly />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Bio</Label>
                      <Textarea value={doctorProfile?.bio || ''} readOnly rows={4} />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-3 block">License Document</Label>
                    {doctorProfile?.licenseDocument ? (
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                        <FileText className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">License Uploaded</p>
                          <p className="text-sm text-green-600">Document verified by admin</p>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Upload your medical license</p>
                        <p className="text-sm text-gray-500 mb-4">PDF, JPG, or PNG up to 10MB</p>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Select File
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList className="mb-4">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upcoming" className="space-y-4">
                      {mockAppointments.filter(a => a.status !== 'cancelled').map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {appointment.patientName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{appointment.patientName}</p>
                              <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                              {appointment.notes && (
                                <p className="text-sm text-gray-400">{appointment.notes}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setActiveTab('messages');
                              }}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Chat
                            </Button>
                            <Button size="sm" className="bg-blue-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Confirm
                            </Button>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="completed">
                      <div className="text-center py-12 text-gray-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No completed appointments yet</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cancelled">
                      <div className="text-center py-12 text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No cancelled appointments</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">J</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">John Smith</CardTitle>
                        <p className="text-sm text-green-600">Online</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                              msg.sender === 'doctor' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p>{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'doctor' ? 'text-blue-200' : 'text-gray-500'}`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} className="bg-blue-600">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
