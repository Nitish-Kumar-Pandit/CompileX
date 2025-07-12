import { useEffect, useState, useCallback, useRef } from 'react';
import Navbar from '../components/Navbar';
import ParticlesBackground from '../components/ParticlesBackground';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import { IoPlay, IoSave } from 'react-icons/io5';

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code
  const { id } = useParams(); // Extract project ID from URL params
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);

  const [data, setData] = useState(null);
  const debounceRef = useRef(null);

  // Fetch project data on mount
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); // Set the fetched code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);

  // Save project function
  const saveProject = useCallback(() => {
    const trimmedCode = code?.toString().trim(); // Ensure code is a string and trimmed
    console.log('Saving code:', trimmedCode); // Debug log

    fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode, // Use the latest code state
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      });
  }, [code, id]);

  // Shortcut handler for saving with Ctrl+S
  const handleSaveShortcut = useCallback((e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault(); // Prevent browser's default save behavior
      saveProject(); // Call the save function
    }
  }, [saveProject]);

  // Add and clean up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [code, handleSaveShortcut]); // Reattach when `code` or handleSaveShortcut changes

  // Debounced onChange handler to improve performance
  const handleCodeChange = useCallback((newCode) => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Update code immediately for responsive typing
    setCode(newCode || '');

    // Debounce console logging to reduce noise
    debounceRef.current = setTimeout(() => {
      console.log('Code updated:', newCode?.length, 'characters');
    }, 500);
  }, []);

  const runProject = () => {
    // Generate the correct file extension based on language
    const getFileExtension = (lang) => {
      switch(lang) {
        case "python": return ".py";
        case "java": return ".java";
        case "javascript": return ".js";
        case "c": return ".c";
        case "cpp": return ".cpp";
        case "bash": return ".sh";
        case "go": return ".go";
        default: return "";
      }
    };

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [
          {
            filename: data.name + getFileExtension(data.projLanguage),
            content: code
          }
        ]
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.run) {
          setOutput(data.run.output);
          setError(data.run.code === 1 ? true : false);
        } else if (data.message) {
          setOutput(data.message);
          setError(true);
        }
      })
      .catch(err => {
        console.error("Error executing code:", err);
        setOutput("Error executing code. Please try again.");
        setError(true);
      });
  }

  return (
    <>
      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <ParticlesBackground />
        <Navbar />

        {/* Main Editor Container */}
        <div className="pt-16 sm:pt-20 page-transition">
          <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] gap-2 sm:gap-4 p-2 sm:p-4">

            {/* Code Editor Section */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-2 sm:p-4 border-b border-white/10">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 flex-shrink-0">
                    <span className="text-white/90 text-xs sm:text-sm font-mono font-bold">&lt;&gt;</span>
                  </div>
                  <h2 className="text-sm sm:text-lg font-semibold text-white truncate">
                    {data?.name || 'Untitled Project'}
                  </h2>
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 flex-shrink-0">
                    {data?.projLanguage || 'python'}
                  </span>
                </div>
                <button
                  onClick={saveProject}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 backdrop-blur-sm bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 text-green-300 rounded-lg transition-all duration-200 text-xs sm:text-sm flex-shrink-0"
                >
                  <IoSave className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Save (Ctrl+S)</span>
                  <span className="sm:hidden">Save</span>
                </button>
              </div>
              <div className="h-[calc(100%-48px)] sm:h-[calc(100%-60px)]">
                <Editor2
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  height="100%"
                  width="100%"
                  language={data?.projLanguage || 'python'}
                  value={code}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                    // Fix cursor positioning issues
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    smoothScrolling: true,
                    // Improve performance and responsiveness
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: 'on',
                    tabCompletion: 'on',
                    // Fix rendering issues
                    renderWhitespace: 'selection',
                    renderControlCharacters: false,
                    fontLigatures: false,
                    // Improve cursor tracking
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    cursorWidth: 2,
                    // Performance optimizations
                    disableLayerHinting: false,
                    disableMonospaceOptimizations: false,
                    hideCursorInOverviewRuler: false
                  }}
                />
              </div>
            </div>

            {/* Output Section */}
            <div className="w-full lg:w-1/2 h-1/2 lg:h-full backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-2 sm:p-4 border-b border-white/10">
                <h2 className="text-sm sm:text-lg font-semibold text-white">Output</h2>
                <button
                  onClick={runProject}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 backdrop-blur-sm bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-200 text-xs sm:text-sm"
                >
                  <IoPlay className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Run Code</span>
                  <span className="sm:hidden">Run</span>
                </button>
              </div>
              <div className="h-[calc(100%-48px)] sm:h-[calc(100%-60px)] p-2 sm:p-4">
                <pre
                  className={`w-full h-full overflow-auto text-xs sm:text-sm font-mono ${
                    error ? "text-red-400" : "text-white/90"
                  } whitespace-pre-wrap`}
                >
                  {output || "Click 'Run' to see the output..."}
                </pre>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
