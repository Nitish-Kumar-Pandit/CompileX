import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IoCalendar, IoCreate, IoTrash } from 'react-icons/io5';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const getLanguageColor = (language) => {
    const colors = {
      python: "from-blue-400 to-yellow-400",
      javascript: "from-yellow-400 to-orange-400",
      cpp: "from-blue-500 to-purple-500",
      c: "from-gray-400 to-blue-400",
      java: "from-orange-400 to-red-400",
      bash: "from-green-400 to-teal-400"
    };
    return colors[language] || "from-gray-400 to-gray-600";
  };

  return (
    <div className="group relative w-full">
      {/* Enhanced card with increased height and full width */}
      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden min-h-[140px] w-full">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getLanguageColor(project.projLanguage)} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>

        {/* Main content area - clickable */}
        <div
          className="relative z-10 h-full flex flex-col"
          onClick={() => navigate("/editor/" + project._id)}
        >
          <div className="flex items-start justify-between flex-1 mb-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Code icon with glassmorphic effect */}
              <div className="flex items-center justify-center w-14 h-14 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg">
                <span className="text-white/90 text-xl font-mono font-bold">&lt;&gt;</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                <div className="flex items-center gap-1 text-sm text-white/60">
                  <IoCalendar className="w-4 h-4" />
                  <span>{new Date(project.date).toDateString()}</span>
                </div>
              </div>
            </div>

            {/* Language badge */}
            <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${getLanguageColor(project.projLanguage)} text-white text-sm font-medium shadow-lg`}>
              {project.projLanguage.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Action buttons - positioned at bottom right, separate from clickable area */}
        <div className="relative z-20 flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200 text-blue-300 hover:text-blue-200 text-sm font-medium shadow-lg"
          >
            <IoCreate className="w-4 h-4" />
            Rename
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project._id);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all duration-200 text-red-300 hover:text-red-200 text-sm font-medium shadow-lg"
          >
            <IoTrash className="w-4 h-4" />
            Delete
          </button>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    projLanguage: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProjectCard;
