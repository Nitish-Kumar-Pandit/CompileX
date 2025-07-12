import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import ParticlesBackground from "../components/ParticlesBackground";
import ProjectCard from "../components/ProjectCard";
import GlassModal from "../components/GlassModal";
import Select from 'react-select';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoAdd, IoCode } from 'react-icons/io5';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // State to store selected language

  const [isEditModelShow, setIsEditModelShow] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      padding: '8px',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      color: '#fff',
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      color: '#fff',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(255, 255, 255, 0.6)',
    }),
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();

    // Filter only the required languages
    const filteredLanguages = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "bash"
    ];

    const options = data
      .filter(runtime => filteredLanguages.includes(runtime.language))
      .map(runtime => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language === "c++" ? "cpp" : runtime.language,
        version: runtime.version,
      }));

    setLanguageOptions(options);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption); // Update selected language state
    console.log("Selected language:", selectedOption);
  };

  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
      if (data.success) {
        setProjects(data.projects);
      }
      else {
        toast.error(data.msg);
      }
    });
  };

  useEffect(() => {
    getProjects();
    getRunTimes();
  }, []);

  const createProj = () => {
    fetch(api_base_url + "/createProj", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        projLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setName("");
        navigate("/editor/" + data.projectId)
      }
      else {
        toast.error(data.msg);
      }
    })
  };

  const deleteProject = (id) => {
    setDeleteProjectId(id);
    setIsDeleteModalShow(true);
  };

  const confirmDeleteProject = () => {
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: deleteProjectId,
        token: localStorage.getItem("token")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        getProjects();
      }
      else {
        toast.error(data.msg);
      }
      setIsDeleteModalShow(false);
      setDeleteProjectId("");
    });
  };

  const [editProjId, setEditProjId] = useState("");

  const updateProj = () => {
    fetch(api_base_url + "/editProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: editProjId,
        token: localStorage.getItem("token"),
        name: name,
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
      else {
        toast.error(data.msg);
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
    })
  };

  return (
    <>
      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 page-transition">
        <ParticlesBackground />

        <Navbar />

        {/* Main Content */}
        <div className="relative z-10 pt-20 sm:pt-24 px-4 sm:px-6 lg:px-16 pb-8 main-content flex-1">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 sm:mb-12">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                🚀 Code. Compile. <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Create.</span>
              </h1>
              <p className="text-white/60 text-base sm:text-lg">Transform your ideas into reality with CompileX - where innovation meets execution.</p>
            </div>

            <button
              onClick={() => setIsCreateModelShow(true)}
              className="flex items-center gap-3 px-4 sm:px-6 py-3 rounded-xl backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl w-full sm:w-auto justify-center sm:justify-start text-sm sm:text-base"
            >
              <IoAdd className="w-5 h-5" />
              <span className="hidden sm:inline">Create New Project</span>
              <span className="sm:hidden">New Project</span>
            </button>
          </div>

          {/* Projects List */}
          <div className="mb-8">

            {projects && projects.length > 0 ? (
              <div className="space-y-4 sm:space-y-6 max-w-10xl mx-auto">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onEdit={(project) => {
                      setIsEditModelShow(true);
                      setEditProjId(project._id);
                      setName(project.name);
                    }}
                    onDelete={deleteProject}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-16">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-12 max-w-md mx-auto">
                  <IoCode className="w-12 h-12 sm:w-16 sm:h-16 text-white/40 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No Projects Yet</h3>
                  <p className="text-white/60 mb-6 text-sm sm:text-base">Start your coding journey by creating your first project!</p>
                  <button
                    onClick={() => setIsCreateModelShow(true)}
                    className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 text-white font-medium mx-auto text-sm sm:text-base"
                  >
                    <IoAdd className="w-5 h-5" />
                    <span className="hidden sm:inline">Create Your First Project</span>
                    <span className="sm:hidden">Create Project</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Create Project Modal */}
          <GlassModal
            isOpen={isCreateModelShow}
            onClose={() => {
              setIsCreateModelShow(false);
              setName("");
              setSelectedLanguage(null);
            }}
            title="Create New Project"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Project Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your project name"
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Programming Language</label>
                <Select
                  placeholder="Select a Language"
                  options={languageOptions}
                  styles={customStyles}
                  onChange={handleLanguageChange}
                  value={selectedLanguage}
                />
              </div>

              {selectedLanguage && (
                <div className="pt-4">
                  <p className="text-sm text-green-400 mb-4">
                    Selected: {selectedLanguage.label}
                  </p>
                  <button
                    onClick={createProj}
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-150 text-white font-medium"
                  >
                    Create Project
                  </button>
                </div>
              )}
            </div>
          </GlassModal>

          {/* Delete Confirmation Modal */}
          <GlassModal
            isOpen={isDeleteModalShow}
            onClose={() => setIsDeleteModalShow(false)}
            title="Delete Project"
          >
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100/10 mb-4">
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Are you sure you want to delete this project?
                </h3>
                <p className="text-white/60">
                  This action cannot be undone. All project data will be permanently removed.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsDeleteModalShow(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 border border-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteProject}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 font-medium"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </GlassModal>

          {/* Edit Project Modal */}
          <GlassModal
            isOpen={isEditModelShow}
            onClose={() => {
              setIsEditModelShow(false);
              setName("");
              setEditProjId("");
            }}
            title="Update Project"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Project Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your project name"
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                />
              </div>

              <button
                onClick={updateProj}
                className="w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 text-white font-medium"
              >
                Update Project
              </button>
            </div>
          </GlassModal>
        </div>
      </div>
    </>
  );
};

export default Home;
