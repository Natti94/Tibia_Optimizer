export default async function registerUser(username, password, email, avatar, csrfToken) {
  if (!username || !password || !email || !csrfToken) {
    throw new Error("Missing fields");
  }
  await new Promise((r) => setTimeout(r, 500));
  return { id: Date.now(), username, email, avatar };
}
