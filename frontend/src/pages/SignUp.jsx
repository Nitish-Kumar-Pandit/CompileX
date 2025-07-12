import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import CompileXLogo from '../components/CompileXLogo';
import ParticlesBackground from '../components/ParticlesBackground';

const SignUp = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        pwd: pwd
      })
    }).then(res => res.json()).then(data => {
      console.log("Signup response:", data); // Debug log
      if(data.success){
        console.log("Signup successful, token:", data.token); // Debug log
        toast.success("Account created successfully! Welcome to CompileX!");

        // Set user as logged in and redirect to home
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          console.log("Token stored, navigating to home..."); // Debug log

          // Force a small delay to ensure localStorage is set before navigation
          setTimeout(() => {
            navigate("/");
          }, 100);
        } else {
          console.error("No token received from server");
          toast.error("Login failed - no token received");
        }
      }
      else{
        console.error("Signup failed:", data.msg); // Debug log
        toast.error(data.msg);
      }
    }).catch(error => {
      console.error("Signup error:", error); // Debug log
      toast.error("Signup failed. Please try again.");
    })
  };

  return (
    <>
      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 page-transition">
        <ParticlesBackground />

        {/* SignUp Container */}
        <div className="flex flex-col items-center justify-center min-h-screen relative z-10 p-4">
          <form onSubmit={submitForm} className='w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl'>

            {/* Logo */}
            <div className="text-center mb-6 sm:mb-8">
              <CompileXLogo className="w-40 h-10 sm:w-48 sm:h-12 mx-auto mb-4" />
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Join CompileX</h1>
              <p className="text-white/60 text-sm sm:text-base">Create your account and start coding</p>
            </div>

            {/* Full Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
              <input
                onChange={(e)=>{setFullName(e.target.value)}}
                value={fullName}
                type="text"
                placeholder='Enter your full name'
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input
                onChange={(e)=>{setEmail(e.target.value)}}
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
                onChange={(e)=>{setPwd(e.target.value)}}
                value={pwd}
                type="password"
                placeholder='Create a password'
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Login Link */}
            <p className='text-white/60 text-sm mb-6 text-center'>
              Already have an account? {' '}
              <Link to="/login" className='text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium'>
                Login
              </Link>
            </p>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp