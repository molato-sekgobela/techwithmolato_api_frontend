// ? FUNCTIONS FOR AUTHORISATION

// * Save token to local storage
// Name ('access') to be changed for specific website
export const setTokenToLocalStorage = (access) => {
  window.localStorage.setItem('access', access)
  // console.log('YOUR TOKEN --->', access)
}

// * Function to get token from local storage
// Name ('access') to be changed for specific website
export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('access')
}

// * Function splits the token and returns a payload
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return

  // Split the token to extract the payload, 
  // then decode to jwt string to JSON
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

// * Function to check user is Authenticated
export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false

  // Get today' timestamp in secs & compare against token expiry
  // returns boolean false if invalid
  // ! Need to add token expiration in the backend
  // const currentTime = Math.floor(Date.now() / 1000)
  // console.log('EXPIRY ===>', payload)
  // return currentTime < payload.exp
}
