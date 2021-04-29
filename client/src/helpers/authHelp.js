export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

export const getPayloadFromToken = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
} 

export const isUserOwner = (userId) => {
  const payload = getPayloadFromToken()
  if (!payload) return false
  return userId === payload.sub
}

export const userIsAuthenticated = () => {
  const payload = getPayloadFromToken()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

