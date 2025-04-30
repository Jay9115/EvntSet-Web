const apiUrl = "https://evntset-backend.onrender.com/api";
//const apiUrl = "http://localhost:5000/api";

const getHeaders = async (): Promise<Record<string, string>> => {
  return {
    "Content-Type": "application/json",
    "x-api-key": "Jay9101620",
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
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const headers = await getHeaders();
  headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Error: ${response.status}`);
  }

  return response.json();
};
export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${apiUrl}/events`, {
      method: "GET",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const createEvent = async (eventData: FormData): Promise<Response> => {
  const headers: Record<string, string> = {
    "x-api-key": "Jay9101620",
    // "Content-Type": ",image/jpg,application/json" 
  };

  try {
    const response = await fetch(`${apiUrl}/events`, {
      method: "POST",
      headers,
      body: eventData,
    });

    if (!response.ok) {
      alert(eventData)
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error in createEvent API:", error);
    throw error;
  }
};
export const updateEvent = async (formData: FormData) => {
  const headers: Record<string, string> = {
    "x-api-key": "Jay9101620",
    // "Content-Type": ",image/jpg,application/json" 
  };
  const response = await fetch(`${apiUrl}/events`, {
    method: 'POST',
    headers,
    body: formData
  });
  return response;
};

export const getEventRegistrationStatus = async (eventId: string): Promise<{ presentUsers: string[]; absentUsers: string[] }> => {
  const headers = await getHeaders();
  const response = await fetch(`https://evntset-backend.onrender.com/eventreg/${eventId}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Error: ${response.status}`);
  }

  return response.json();
};
