import type { Candidate } from '../types';

interface DiversityDashboardProps {
  five: Candidate[];
}

export function DiversityDashboard({ five }: DiversityDashboardProps) {
  // Calculate diversity metrics
  const calculateDiversity = (candidates: Candidate[]) => {
    const genderCount = candidates.reduce((acc, curr) => {
      acc[curr.gender] = (acc[curr.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const ethnicityCount = candidates.reduce((acc, curr) => {
      acc[curr.ethnicity] = (acc[curr.ethnicity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { genderCount, ethnicityCount };
  };

  const { genderCount: fiveGender, ethnicityCount: fiveEthnicity } = calculateDiversity(five);
  // All candidates data is not currently used in the UI
  // const { genderCount: allGender, ethnicityCount: allEthnicity } = calculateDiversity(all);

  const renderDiversityMetric = (title: string, fiveData: Record<string, number>) => (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      <div className="space-y-2">
        {Object.entries(fiveData).map(([key, count]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-xs text-gray-600">{key}</span>
            <div className="flex items-center">
              <span className="text-xs font-medium w-6 text-right">{count}</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full ml-2 overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${(count / five.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 ml-2 w-8">
                {Math.round((count / five.length) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Diversity Dashboard</h2>
      {renderDiversityMetric('Gender Diversity', fiveGender)}
      {renderDiversityMetric('Ethnicity Diversity', fiveEthnicity)}
    </div>
  );
}
