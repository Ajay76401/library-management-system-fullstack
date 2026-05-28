const BASE_URL ="https://library-management-system-fullstack-1.onrender.com"
  export async function apiFetch(endpoint, options = {}) {
    console.log(import.meta.env.VITE_API_URL)
  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {

      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },

      ...options
    }
  )

  return response
}