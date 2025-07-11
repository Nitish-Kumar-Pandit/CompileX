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
        <div className="flex px-8 lg:px-16 items-center justify-between h-20">
          {/* Logo */}
          <CompileXLogo className="w-40 h-8" />

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                isActive('/')
                  ? 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <IoHome className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <IoInformationCircle className="w-4 h-4" />
              <span>About</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                window.location.reload();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 text-red-300 hover:text-red-200"
            >
              <IoLogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar