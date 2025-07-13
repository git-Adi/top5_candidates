import { useState } from 'react';

type UploadProps = {
  onUpload: (file: File) => Promise<{ success: boolean; error?: string }>;
  loading?: boolean;
};

export function Upload({ onUpload, loading = false }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setError(null);
    setSuccess(false);
    
    try {
      const result = await onUpload(file);
      if (result.success) {
        setSuccess(true);
        setFile(null); // Reset file input
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Upload failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Candidates JSON</h2>
      <div className="flex flex-col space-y-3 w-full">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <label className="block w-full sm:flex-1">
            <span className="sr-only">Choose file</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              disabled={loading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        <div className="space-y-2">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600">File uploaded successfully!</p>
          )}
          {file && (
            <p className="text-sm text-gray-600 truncate">
              Selected file: <span className="font-medium">{file.name}</span> ({Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>
        
        {success && (
          <div className="mt-2 p-2 text-sm text-green-600 bg-green-50 rounded">
            File uploaded successfully! Processing candidates...
          </div>
        )}
      </div>
    </div>
  );
}
