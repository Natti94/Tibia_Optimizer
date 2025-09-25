export default async function loginUser(username, password) {
  if (!username || !password) {
    throw new Error("Missing credentials");
  }
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));
  return { username };
}
