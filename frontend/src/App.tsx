import { Upload } from './components/Upload';
import { CandidateTable } from "./components/CandidateTable";
import { DiversityDashboard } from "./components/DiversityDashboard";
import { FinalFive } from "./components/FinalFive";
import { useCandidates } from "./hooks/useCandidates";

function App() {
  const { candidates, five, loading, error, uploadFile } = useCandidates();

  const handleFileUpload = async (file: File) => {
    return await uploadFile(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">HireFive - Candidate Selection</h1>
          {error && (
            <div className="mt-2 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow">
              <Upload onUpload={handleFileUpload} loading={loading} />
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">All Candidates ({candidates.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <CandidateTable candidates={candidates} />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Top 5 Candidates</h2>
              </div>
              <FinalFive five={five} />
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Diversity Dashboard</h2>
              </div>
              <DiversityDashboard five={five} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
