const BASE_URL =
  "https://library-management-system-fullstack-1.onrender.com"

export async function apiFetch(endpoint, options = {}) {

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

  // if unauthorized
  if (response.status === 401) {
    // redirect to login page
    window.location.href = "/login"
    throw new Error("Unauthorized")
  }

 if (!response.ok) {

    throw new Error(
      `HTTP error! status: ${response.status}`
    )
  }

  const contentType =
    response.headers.get("content-type")

  // only parse json if actually json
  if (
    contentType &&
    contentType.includes("application/json")
  ) {

    return response.json()
  }

  return null
}