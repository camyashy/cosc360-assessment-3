//const API_URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : '';
const API_URL = import.meta.env.VITE_API_URL || '/api';

function getToken(): string | null {
    return localStorage.getItem("token");
}

async function apiClient(endpoint: string, method: string, body?: any): Promise<any> {
    const token = getToken();

    // Set up default headers for request
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    // If token exists, add it to Authorization header
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    // Set up options for the fetch call
    const options: RequestInit = {
        method: method,
        headers: headers,
    }

    // If there is a body (for POST/PUT)
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        console.log('Fetching:', `${API_URL}${endpoint}`);
        const response = await fetch(`${API_URL}${endpoint}`, options);

        if (!response.ok) {

            const errorData = await response.json();

            throw new Error(errorData.message || "An unknown error occured");
        }

        return await response.json();
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
}

export const api = {
    get: (endpoint: string) => apiClient(endpoint, "GET"),
    post: (endpoint: string, body: any) => apiClient(endpoint, "POST", body),
    put: (endpoint: string, body: any) => apiClient(endpoint, "PUT", body),
    delete: (endpoint: string) => apiClient(endpoint, "DELETE"),
};