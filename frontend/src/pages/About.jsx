// React import not needed in React 17+
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticlesBackground from '../components/ParticlesBackground';
import { IoCode, IoRocket, IoShield, IoCloud, IoFlash, IoGlobe, IoCheckmark, IoStar } from 'react-icons/io5';

const About = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const features = [
    {
      icon: <IoCode className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Write and execute code in Python, JavaScript, Java, C++, C, Go, Rust, and many more programming languages.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <IoRocket className="w-8 h-8" />,
      title: "Instant Execution",
      description: "Run your code instantly with our powerful cloud-based execution engine. No setup required.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <IoCloud className="w-8 h-8" />,
      title: "Cloud Storage",
      description: "Your projects are automatically saved to the cloud. Access them from anywhere, anytime.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <IoFlash className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Share your projects and collaborate with others in real-time. Perfect for team development.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <IoShield className="w-8 h-8" />,
      title: "Secure Environment",
      description: "Your code runs in a secure, sandboxed environment. Privacy and security are our top priorities.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <IoGlobe className="w-8 h-8" />,
      title: "Cross-Platform",
      description: "Access CompileX from any device with a web browser. Works seamlessly on desktop, tablet, and mobile.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "15+", label: "Programming Languages" },
    { number: "10K+", label: "Projects Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const technologies = [
    "React", "Node.js", "MongoDB", "Express.js", "Monaco Editor", "Piston API", "Tailwind CSS", "Docker"
  ];

  return (
    <>
      <Navbar />
      <ParticlesBackground />
      
      <div className="min-h-screen pt-20 relative z-10 page-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                About CompileX
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into reality with CompileX - where innovation meets execution. 
              Our cloud-based IDE empowers developers to code, compile, and create without boundaries.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-20">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
                  We believe that great ideas should not be limited by technical barriers. CompileX democratizes
                  software development by providing a powerful, accessible, and intuitive platform that enables
                  anyone to bring their coding vision to life. Whether you are a beginner learning your first
                  programming language or an experienced developer prototyping the next big thing, CompileX is
                  your gateway to unlimited possibilities.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-20">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                CompileX by the Numbers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/70 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Built with Modern Technology
            </h2>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 backdrop-blur-sm bg-white/10 border border-white/20 rounded-full text-white/80 hover:bg-white/20 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose CompileX */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Choose CompileX?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <IoCheckmark className="w-6 h-6 text-green-400" />
                  For Beginners
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>• No installation or setup required</li>
                  <li>• Intuitive interface designed for learning</li>
                  <li>• Instant feedback and error highlighting</li>
                  <li>• Access to multiple programming languages</li>
                </ul>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <IoStar className="w-6 h-6 text-yellow-400" />
                  For Professionals
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li>• Rapid prototyping and testing</li>
                  <li>• Collaborative development features</li>
                  <li>• Cloud-based project management</li>
                  <li>• Enterprise-grade security</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Coding?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who trust CompileX for their coding needs. 
                Start your journey today and experience the future of cloud-based development.
              </p>
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
