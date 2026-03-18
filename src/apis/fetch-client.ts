// lib/api-client.ts

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse(response: Response) {
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || "An error occurred");
    }

    if (contentType?.includes("application/json")) {
      return response.json();
    }

    return response.text();
  }

  private createUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const {
      params,
      requiresAuth = false,
      headers = {},
      ...restOptions
    } = options;

    const url = this.createUrl(endpoint, params);

    const requestHeaders: any = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (requiresAuth) {
      //   requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      return this.handleResponse(response);
    } catch (error) {
      throw new Error(`API request failed: ${(error as Error).message}`);
    }
  }

  // Convenience methods for common HTTP methods
  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

// Create and export the API client instance
export const fetchClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "");

// Export the class for potential extension
export default ApiClient;
