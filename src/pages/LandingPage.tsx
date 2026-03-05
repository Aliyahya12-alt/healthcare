import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  Users, 
  Shield, 
  Clock, 
  MessageSquare, 
  CheckCircle,
  AlertTriangle,
  Heart,
  Menu,
  X,
  User
} from 'lucide-react';
import { useState } from 'react';


interface LandingPageProps {
  onFindDoctor: () => void;
  onJoinAsDoctor: () => void;
  onLogin: () => void;
  isAuthenticated: boolean;
  onNavigateToDashboard: () => void;
}

export default function LandingPage({ 
  onFindDoctor, 
  onJoinAsDoctor, 
  onLogin, 
  isAuthenticated,
  onNavigateToDashboard 
}: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="CareConnect" className="h-10 w-10" />
              <span className="text-xl font-semibold text-gray-900">CareConnect</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#trust" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Trust & Safety
              </a>
              <a href="#disclaimer" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Disclaimer
              </a>
              
              {isAuthenticated ? (
                <Button onClick={onNavigateToDashboard} className="bg-blue-600 hover:bg-blue-700">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" onClick={onLogin} className="text-gray-600">
                    Log In
                  </Button>
                  <Button onClick={onFindDoctor} className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
            <a href="#how-it-works" className="block py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </a>
            <a href="#trust" className="block py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
              Trust & Safety
            </a>
            <a href="#disclaimer" className="block py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
              Disclaimer
            </a>
            {isAuthenticated ? (
              <Button onClick={onNavigateToDashboard} className="w-full bg-blue-600">
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={onLogin} className="w-full">
                  Log In
                </Button>
                <Button onClick={onFindDoctor} className="w-full bg-blue-600">
                  Get Started
                </Button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1.5 text-sm font-medium">
                <Heart className="w-3.5 h-3.5 mr-1.5" />
                Nonprofit Healthcare Initiative
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Free Healthcare Access for{' '}
                <span className="text-blue-600">Everyone</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                CareConnect connects licensed, verified doctors with patients who need 
                medical advice but cannot afford traditional healthcare. Our volunteer 
                physicians provide free online consultations to ensure everyone has 
                access to quality medical guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={onFindDoctor}
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Find a Doctor
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={onJoinAsDoctor}
                  className="text-lg px-8 py-6 border-2"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Join as a Doctor
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Verified Doctors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/hero-image.jpg" 
                  alt="Healthcare professionals" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>
              
              {/* Stats Card */}
              <Card className="absolute -bottom-6 -left-6 shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">500+</p>
                      <p className="text-sm text-gray-500">Verified Doctors</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-blue-600">10K+</p>
                      <p className="text-sm text-gray-500">Patients Helped</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Getting free medical advice is simple and straightforward. Follow these three easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <User className="w-8 h-8 text-white" />,
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up as a patient with your email. Verify your account to get started with our secure platform.',
                color: 'bg-blue-600',
              },
              {
                icon: <Stethoscope className="w-8 h-8 text-white" />,
                step: '02',
                title: 'Find a Doctor',
                description: 'Browse our network of verified doctors by specialization. View profiles, ratings, and availability.',
                color: 'bg-blue-500',
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-white" />,
                step: '03',
                title: 'Start Consultation',
                description: 'Book an appointment and chat with your doctor. Get professional medical advice completely free.',
                color: 'bg-blue-400',
              },
            ].map((item, index) => (
              <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                    {item.icon}
                  </div>
                  <span className="text-5xl font-bold text-gray-100 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Your Safety is Our Priority
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We understand that trust is essential when it comes to healthcare. 
                That is why we have implemented rigorous verification processes to ensure 
                every doctor on our platform is licensed and qualified.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Shield className="w-6 h-6 text-blue-600" />,
                    title: 'License Verification',
                    description: 'Every doctor\'s medical license is thoroughly verified by our admin team before approval.',
                  },
                  {
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
                    title: 'Background Checks',
                    description: 'We conduct comprehensive background checks to ensure doctor credentials and history.',
                  },
                  {
                    icon: <Clock className="w-6 h-6 text-blue-600" />,
                    title: 'Continuous Monitoring',
                    description: 'Regular reviews and patient feedback help us maintain high-quality standards.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Verification Process</h3>
                <div className="space-y-4">
                  {[
                    'Doctor submits license and credentials',
                    'Admin team reviews all documents',
                    'License number verified with medical board',
                    'Background check completed',
                    'Doctor approved for consultations',
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section id="disclaimer" className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-10 h-10 text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-amber-900 mb-3">
                  Important Medical Disclaimer
                </h2>
                <div className="text-amber-800 space-y-2 text-sm leading-relaxed">
                  <p>
                    <strong>Not for Emergency Use:</strong> CareConnect is not intended for medical emergencies. 
                    If you are experiencing a life-threatening emergency, please call your local emergency 
                    services (911 in the US) or go to the nearest emergency room immediately.
                  </p>
                  <p>
                    <strong>Not a Replacement for Primary Care:</strong> Our platform provides general medical 
                    advice and guidance. It does not replace your regular doctor or ongoing medical treatment. 
                    Always consult with your primary healthcare provider for comprehensive care.
                  </p>
                  <p>
                    <strong>Limitations:</strong> Online consultations have limitations. Doctors cannot perform 
                    physical examinations, order lab tests, or prescribe controlled substances through this platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have received free medical advice through CareConnect. 
            Our verified doctors are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onFindDoctor}
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
            >
              Find a Doctor Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onJoinAsDoctor}
              className="border-2 border-white text-white hover:bg-blue-700 text-lg px-8 py-6"
            >
              Volunteer as a Doctor
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="CareConnect" className="h-10 w-10" />
                <span className="text-xl font-semibold text-white">CareConnect</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                A nonprofit initiative dedicated to providing free healthcare access 
                to everyone through our network of volunteer doctors.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#trust" className="hover:text-white transition-colors">Trust & Safety</a></li>
                <li><a href="#disclaimer" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} CareConnect. A nonprofit healthcare initiative.
            </p>
            <p className="text-sm text-gray-500">
              Made with <Heart className="w-4 h-4 inline text-red-500" /> for better healthcare access
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
