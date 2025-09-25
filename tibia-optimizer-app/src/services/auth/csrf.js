// Simple CSRF token generator placeholder
export default async function generateCsrf() {
  // In a real app, request a token from the server
  return Math.random().toString(36).slice(2);
}
