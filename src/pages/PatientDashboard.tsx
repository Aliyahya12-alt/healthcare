import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useAuthStore, mockDoctors, mockAppointments } from '@/store/authStore';
import { 
  Search, 
  MessageSquare, 
  Star,
  Clock,
  LogOut,
  Filter,
  Send,
  ChevronLeft
} from 'lucide-react';

interface PatientDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export default function PatientDashboard({ onLogout, onNavigateHome }: PatientDashboardProps) {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('find-doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<typeof mockDoctors[0] | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'doctor', name: 'Dr. Sarah Johnson', message: 'Hello! How can I help you today?', time: '10:00 AM' },
  ]);

  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessages([...chatMessages, {
      id: Date.now().toString(),
      sender: 'patient',
      name: user?.name || 'Patient',
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setChatMessage('');
  };

  const handleBookAppointment = () => {
    setShowBookingDialog(false);
    setBookingForm({ date: '', time: '', notes: '' });
    // Show success message or redirect
  };

  const handleSubmitReview = () => {
    setShowReviewDialog(false);
    setReviewForm({ rating: 5, comment: '' });
  };

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = specializationFilter === 'all' || doctor.specialization === specializationFilter;
    return matchesSearch && matchesSpecialization;
  });

  const specializations = ['all', ...Array.from(new Set(mockDoctors.map(d => d.specialization)))];

  if (showChat) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowChat(false)} className="flex items-center gap-2 text-gray-600">
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">S</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Card className="h-[calc(100vh-140px)] flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        msg.sender === 'patient' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'patient' ? 'text-blue-200' : 'text-gray-500'}`}>
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
          </Card>
        </div>
      </div>
    );
  }

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
            <span className="text-gray-600 hidden sm:block">Patient Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {user?.name?.charAt(0) || 'P'}
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="find-doctors">Find Doctors</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Find Doctors Tab */}
          <TabsContent value="find-doctors" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="Search doctors by name or specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specializations</SelectItem>
                      {specializations.filter(s => s !== 'all').map(spec => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Doctors List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                          {doctor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-blue-600 text-sm">{doctor.specialization}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500 text-sm">({doctor.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.bio}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{doctor.experience} years experience</span>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setShowDoctorProfile(true);
                        }}
                      >
                        View Profile
                      </Button>
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setShowBookingDialog(true);
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {appointment.doctorName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.doctorName}</p>
                          <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                          <Badge className={
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-700 mt-1' :
                            appointment.status === 'pending' ? 'bg-amber-100 text-amber-700 mt-1' :
                            'bg-gray-100 text-gray-700 mt-1'
                          }>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.status === 'completed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowReviewDialog(true)}
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          className="bg-blue-600"
                          onClick={() => setShowChat(true)}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Conversations</h3>
                <p className="text-gray-500 mb-4">Start chatting with your doctor from the appointments tab</p>
                <Button onClick={() => setActiveTab('appointments')} className="bg-blue-600">
                  View Appointments
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Doctor Profile Dialog */}
      <Dialog open={showDoctorProfile} onOpenChange={setShowDoctorProfile}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Doctor Profile</DialogTitle>
          </DialogHeader>
          {selectedDoctor && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {selectedDoctor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedDoctor.name}</h3>
                  <p className="text-blue-600">{selectedDoctor.specialization}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-lg">{selectedDoctor.rating}</span>
                    <span className="text-gray-500">({selectedDoctor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-gray-600">{selectedDoctor.bio}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">Experience</h4>
                  <p className="text-gray-600">{selectedDoctor.experience} years</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Consultations</h4>
                  <p className="text-gray-600">{selectedDoctor.consultationsCompleted} completed</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Availability</h4>
                <div className="space-y-2">
                  {selectedDoctor.availability.map((slot) => (
                    <div key={slot.id} className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{slot.day}:</span>
                      <span className="text-gray-600">{slot.startTime} - {slot.endTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDoctorProfile(false)}>Close</Button>
            <Button 
              className="bg-blue-600"
              onClick={() => {
                setShowDoctorProfile(false);
                setShowBookingDialog(true);
              }}
            >
              Book Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              {selectedDoctor && `Schedule a consultation with ${selectedDoctor.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input 
                type="date" 
                value={bookingForm.date}
                onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Select 
                value={bookingForm.time} 
                onValueChange={(value) => setBookingForm({...bookingForm, time: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea 
                placeholder="Briefly describe your symptoms or concerns..."
                value={bookingForm.notes}
                onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>Cancel</Button>
            <Button className="bg-blue-600" onClick={handleBookAppointment}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
            <DialogDescription>Share your experience with the doctor</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewForm({...reviewForm, rating: star})}
                    className="p-1"
                  >
                    <Star 
                      className={`w-8 h-8 ${star <= reviewForm.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Your Review</Label>
              <Textarea 
                placeholder="Share your experience..."
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>Cancel</Button>
            <Button className="bg-blue-600" onClick={handleSubmitReview}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
