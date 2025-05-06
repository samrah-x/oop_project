import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api", // Fallback to localhost if not defined
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
})

// Function to set the JWT token in the Authorization header
const setTokens = (accessToken: string, refreshToken: string) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  localStorage.setItem("accessToken", accessToken)
  localStorage.setItem("refreshToken", refreshToken)
}

// Function to remove the JWT token from the Authorization header (logout)
const logout = () => {
  delete apiClient.defaults.headers.common["Authorization"]
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

// Function to check if the user is authenticated (token exists)
const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken")
}

// Add a request interceptor to include the token in every request
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Check if the error is due to an expired token and if we haven't already tried to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem("refreshToken")

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"}/auth/refresh`, // Replace with your refresh token endpoint
            { refreshToken: refreshToken },
          )

          // Define the expected structure of the refresh token response
                    interface RefreshResponse {
                      accessToken: string;
                      refreshToken: string;
                    }
          
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data as RefreshResponse;

          setTokens(newAccessToken, newRefreshToken)

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return apiClient(originalRequest)
        } catch (refreshError) {
          // Handle refresh token error (e.g., redirect to login)
          console.error("Failed to refresh token:", refreshError)
          logout()
          window.location.href = "/login" // Redirect to login page
          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token available, redirect to login
        logout()
        window.location.href = "/login" // Redirect to login page
      }
    }

    return Promise.reject(error)
  },
)

export { setTokens, logout, isAuthenticated }
export default apiClient
