import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';

const GlassModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 text-white/70 hover:text-white"
            >
              <IoClose className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

GlassModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default GlassModal;
