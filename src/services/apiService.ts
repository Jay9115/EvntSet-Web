const apiUrl = "https://evntset-backend.onrender.com/api/auth";

const getHeaders = async (): Promise<Record<string, string>> => {
  return {
    "Content-Type": "application/json",
    "x-api-key": "Jay9101620", // ✅ Add API Key
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
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
