// React import not needed in React 17+
import { Link } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';
import CompileXLogo from '../components/CompileXLogo';
import { IoHome, IoArrowBack } from 'react-icons/io5';

const NoPage = () => {
  return (
    <>
      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 page-transition">
        <ParticlesBackground />

        {/* 404 Container */}
        <div className="flex flex-col items-center justify-center min-h-screen relative z-10 p-4">
          <div className="text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-12 max-w-lg mx-auto">

            {/* Logo */}
            <CompileXLogo className="w-48 h-12 mx-auto mb-8" />

            {/* 404 Text */}
            <div className="mb-8">
              <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
              <p className="text-white/60 text-lg">
                The page you are looking for does not exist or has been moved.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <IoHome className="w-5 h-5" />
                Go Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium"
              >
                <IoArrowBack className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPage;