import PropTypes from 'prop-types';

const CompileXLogo = ({ className = "w-32 h-8", textColor = "text-white" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="w-8 h-8 mr-2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="url(#logoGradient)"
          opacity="0.1"
          filter="url(#glow)"
        />
        
        {/* Main logo shape - stylized "C" and "X" */}
        <path
          d="M12 10 C8 10, 6 12, 6 16 L6 24 C6 28, 8 30, 12 30"
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* X shape */}
        <path
          d="M24 12 L32 28 M32 12 L24 28"
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Code brackets */}
        <path
          d="M14 14 L16 16 L14 18 M22 14 L20 16 L22 18"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
      
      <span className={`font-bold text-xl ${textColor} tracking-tight`}>
        Compile<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">X</span>
      </span>
    </div>
  );
};

CompileXLogo.propTypes = {
  className: PropTypes.string,
  textColor: PropTypes.string
};

export default CompileXLogo;
