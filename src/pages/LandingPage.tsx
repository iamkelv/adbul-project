import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Shield, Users, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import mauLogo from '@/assets/mau-logo.png';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-10 bg-white/90 backdrop-blur-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={mauLogo} alt="MAU Logo" className="h-8 w-8" />
              <div>
                <span className="text-lg font-bold text-orange-800">
                  MAU Complaint System
                </span>
                <p className="text-xs text-orange-600">Modibbo Adama University</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" asChild className="text-orange-700 hover:bg-orange-50">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6">
            Your Voice Matters at MAU
          </h1>
          <p className="text-xl text-orange-700 mb-4 max-w-3xl mx-auto">
            Streamlined complaint management system for Modibbo Adama University students and administrators. 
            Submit concerns, track progress, and build a better university experience together.
          </p>
          <div className="text-sm text-orange-600 mb-8 italic font-medium">
            "Knowledge And Humanism" - Established in 1981, Yola
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white">
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-3 border-orange-300 text-orange-700 hover:bg-orange-50">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-orange-700 max-w-2xl mx-auto">
              Built specifically for Modibbo Adama University to enhance communication 
              between students and administration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-orange-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle className="text-orange-900">Student Portal</CardTitle>
                <CardDescription className="text-orange-700">
                  Easy-to-use interface for submitting and tracking complaints
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle className="text-orange-900">Admin Dashboard</CardTitle>
                <CardDescription className="text-orange-700">
                  Comprehensive tools for managing and resolving student concerns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle className="text-orange-900">Real-time Updates</CardTitle>
                <CardDescription className="text-orange-700">
                  Stay informed with instant notifications on complaint status
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle className="text-orange-900">Analytics</CardTitle>
                <CardDescription className="text-orange-700">
                  Data-driven insights to improve university services
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join fellow MAU students already using our platform to create positive change.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3 bg-white text-orange-600 hover:bg-orange-50">
            <Link to="/register">
              Start Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0 space-x-3">
              <img src={mauLogo} alt="MAU Logo" className="h-8 w-8" />
              <div>
                <span className="text-lg font-semibold">
                  MAU Complaint System
                </span>
                <p className="text-orange-200 text-sm">Modibbo Adama University, Yola</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-orange-200 mb-1">Knowledge And Humanism</p>
              <p className="text-orange-300 text-sm">© 2024 MAU. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;