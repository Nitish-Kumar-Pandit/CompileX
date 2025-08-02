import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_base_url } from '../helper';
import CompileXLogo from '../components/CompileXLogo';
import ParticlesBackground from '../components/ParticlesBackground';

const Login = () => {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        pwd: pwd
      })
    }).then(res => res.json()).then(data => {
      console.log("Login response:", data); // Debug log
      if (data.success) {
        console.log("Login successful, token:", data.token); // Debug log

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", "true");

          // Trigger custom event to update login state immediately
          window.dispatchEvent(new Event('loginStateChange'));

          // Navigate immediately - no delay needed
          navigate("/");
        } else {
          console.error("No token received from server");
          toast.error("Login failed - no token received");
        }
      }
      else {
        console.error("Login failed:", data.msg); // Debug log
        toast.error(data.msg);
      }
    }).catch(error => {
      console.error("Login error:", error); // Debug log
      toast.error("Login failed. Please try again.");
    }).finally(() => {
      setIsLoading(false); // Reset loading state
    })
  };

  return (
    <>
      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 page-transition">
        <ParticlesBackground />

        {/* Login Container */}
        <div className="flex flex-col items-center justify-center min-h-screen relative z-10 p-4">
          <form onSubmit={submitForm} className='w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl'>

            {/* Logo */}
            <div className="text-center mb-6 sm:mb-8">
              <CompileXLogo className="w-40 h-10 sm:w-48 sm:h-12 mx-auto mb-4" />
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-white/60 text-sm sm:text-base">Sign in to your CompileX account</p>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input
                onChange={(e) => { setEmail(e.target.value) }}
                value={email}
                type="email"
                placeholder='Enter your email'
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <input
                onChange={(e) => { setPwd(e.target.value) }}
                value={pwd}
                type="password"
                placeholder='Enter your password'
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Sign Up Link */}
            <p className='text-white/60 text-sm mb-6 text-center'>
              Do not have an account? {' '}
              <Link to="/signUp" className='text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium'>
                Sign Up
              </Link>
            </p>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login