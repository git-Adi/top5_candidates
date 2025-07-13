import type { Candidate } from '../types';

interface FinalFiveProps {
  five: Candidate[];
}

export function FinalFive({ five }: FinalFiveProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold mb-4">Final Five</h2>
      <div className="space-y-3">
        {five.length > 0 ? (
          five.map((candidate, index) => (
            <div 
              key={candidate.id} 
              className="flex items-center p-2 border rounded-lg hover:bg-gray-50"
              draggable
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{candidate.name}</p>
                <p className="text-xs text-gray-500 truncate">{candidate.email}</p>
              </div>
              <button className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">Drag candidates here or select from the list</p>
          </div>
        )}
      </div>
    </div>
  );
}
