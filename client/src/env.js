export const dev = window.location.origin.includes('localhost')
// NOTE our API is spun up on port 3000, so we don't want to change this
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = true
export const domain = 'dev-h63x8ohlbl1q2qkp.us.auth0.com'
export const clientId = 'XX15k7a9Be1KE1Usl1aaOrDdzKJwvtUp'
export const audience = 'https://jeremyisaraddude.com'
