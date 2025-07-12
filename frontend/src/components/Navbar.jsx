// React import not needed in React 17+
import { Link, useLocation } from 'react-router-dom'
import { IoLogOut, IoHome, IoInformationCircle } from 'react-icons/io5'
import CompileXLogo from './CompileXLogo'

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="flex px-4 sm:px-6 lg:px-16 items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <CompileXLogo className="w-32 h-6 sm:w-40 sm:h-8" />

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 text-sm sm:text-base min-w-[44px] ${
                isActive('/')
                  ? 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <IoHome className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 text-sm sm:text-base min-w-[44px] ${
                isActive('/about')
                  ? 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <IoInformationCircle className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                window.location.reload();
              }}
              className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg backdrop-blur-sm bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 text-red-300 hover:text-red-200 text-sm sm:text-base min-w-[44px]"
            >
              <IoLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar