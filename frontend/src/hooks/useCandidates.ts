import { useState, useEffect } from 'react';
import type { Candidate } from '../types';

const API_URL = 'http://localhost:4000';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [five, setFive] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/candidate`);
      if (!response.ok) throw new Error('Failed to fetch candidates');
      const data = await response.json();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch top 5 candidates
  const fetchTopFive = async () => {
    try {
      const response = await fetch(`${API_URL}/final5`);
      if (!response.ok) throw new Error('Failed to fetch top 5 candidates');
      const data = await response.json();
      setFive(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching top 5 candidates:', err);
    }
  };

  // Upload file and update candidates
  const uploadFile = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      console.log('Sending file to:', `${API_URL}/upload`);
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, let the browser set it with the correct boundary
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Upload response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `Server responded with status ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          const text = await response.text();
          if (text) {
            errorMessage = text;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Upload successful, refreshing data...');
      
      // Refresh both candidates and top 5 after successful upload
      await Promise.all([fetchCandidates(), fetchTopFive()]);
      
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      console.error('Error uploading file:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchCandidates(), fetchTopFive()]);
    };
    loadData();
  }, []);

  return { 
    candidates, 
    five, 
    loading, 
    error, 
    uploadFile,
    refreshData: () => Promise.all([fetchCandidates(), fetchTopFive()])
  };
};
