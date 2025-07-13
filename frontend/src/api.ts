const base = "http://localhost:4000";

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const upload = async (file: File): Promise<ApiResponse> => {
  try {
    const form = new FormData();
    form.append("file", file);
    
    const response = await fetch(`${base}/upload`, {
      method: "POST",
      body: form,
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload failed:', response.status, errorText);
      return { 
        success: false, 
        error: errorText || `Server responded with status ${response.status}` 
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error during file upload:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

export const list = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${base}/candidate`, {
      mode: 'cors',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch candidates' 
    };
  }
};

export const final5 = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${base}/final5`, {
      mode: 'cors',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching top 5 candidates:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch top 5 candidates' 
    };
  }
};