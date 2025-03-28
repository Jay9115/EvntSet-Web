const apiUrl = "https://evntset-backend.onrender.com/api/auth";

const getHeaders = async (): Promise<Record<string, string>> => {
  return {
    "Content-Type": "application/json",
    "x-api-key": "Jay9101620"
  };
};

export const postRequest = async <T extends Record<string, unknown>>(endpoint: string, data: T) => {
  const headers = await getHeaders();
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Error: ${response.status}`);
  }

  return response.json();
};

export const getRequestWithAuth = async (endpoint: string) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const headers = await getHeaders();
  headers['Authorization'] = `Bearer ${token}`;
  
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
