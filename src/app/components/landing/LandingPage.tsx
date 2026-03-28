import { Link } from "react-router";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Brain,
  Mic,
  FileText,
  Video,
  Upload,
  Sparkles,
  Check,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

export function LandingPage() {
  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Recording",
      description: "Record voice notes instantly and let AI transcribe and analyze them",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "File Upload",
      description: "Upload PDF, Word documents, and audio files for AI processing",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Links",
      description: "Share video links and get AI-powered summaries and insights",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Text Notes",
      description: "Write text notes and enhance them with AI-powered suggestions",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart AI Processing",
      description: "Powered by GPT-4, Claude, and other advanced AI models",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Instant Insights",
      description: "Get summaries, key points, and actionable insights instantly",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "10x Faster",
      description: "Process notes 10x faster than manual methods",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Boost Productivity",
      description: "Save hours every week with AI automation",
    },
  ];

  const plans = [
    {
      name: "Basic",
      price: "4.99",
      period: "month",
      description: "Perfect for getting started",
      features: [
        "Up to 50 notes/month",
        "Basic AI models",
        "Text input only",
        "Email support",
        "5GB storage",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "12.99",
      period: "month",
      description: "Most popular choice",
      features: [
        "Unlimited notes",
        "Premium AI models (GPT-4)",
        "All input types",
        "Priority support",
        "50GB storage",
        "Advanced analytics",
      ],
      popular: true,
    },
    {
      name: "Platinum",
      price: "29.99",
      period: "month",
      description: "For power users",
      features: [
        "Everything in Premium",
        "Highest-tier AI models",
        "API access",
        "24/7 priority support",
        "Unlimited storage",
        "Custom integrations",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "SJ",
      content:
        "AI Notes has transformed how I work. I can now process hours of interview recordings in minutes!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Student",
      avatar: "MC",
      content:
        "Perfect for studying. I upload lecture recordings and get instant summaries and key points.",
      rating: 5,
    },
    {
      name: "Emma Williams",
      role: "Business Analyst",
      avatar: "EW",
      content:
        "The AI insights are incredible. It helps me extract actionable data from meeting notes.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Notes</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900">
                Testimonials
              </a>
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by Advanced AI
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Notes with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                AI Magic
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Record, upload, or write notes. Let AI analyze, summarize, and extract
              insights instantly. Works with voice, text, documents, and video links.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Demo */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200 shadow-2xl">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-sm text-gray-500">AI Notes Dashboard</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Mic className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Voice Note</span>
                    </div>
                    <p className="text-sm text-blue-800">Recording in progress...</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">AI Processing</span>
                    </div>
                    <p className="text-sm text-purple-800">Analyzing content...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">12,483+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">500K+</div>
              <div className="text-gray-600">Notes Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-gray-600 flex items-center gap-1">
                Rating
                <div className="flex gap-1 ml-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Process Notes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple input methods, powerful AI processing, and instant insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Why AI Notes?</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Work Smarter, Not Harder
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                AI Notes helps you save time, boost productivity, and get more done
                with intelligent note processing.
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-900">
                      Processing Status
                    </span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <p className="text-sm text-green-800">
                    AI is analyzing your meeting recording...
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Key Insights Extracted
                    </span>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 5 action items identified</li>
                    <li>• 3 important decisions made</li>
                    <li>• Summary ready</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-900">
                      Processing Time
                    </span>
                    <span className="text-sm font-bold text-purple-900">2.3s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Pricing</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade as you grow. All plans include 14-day trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 ${
                  plan.popular
                    ? "border-blue-500 shadow-xl relative"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands of Users
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our users have to say about AI Notes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Notes?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who are already saving time with AI Notes
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">AI Notes</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transform your notes with AI magic. Process voice, text, documents,
                and videos instantly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2026 AI Notes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}