import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateCsrf, registerUser } from "../../../services";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [avatar] = useState(() => {
    const randomId = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/80?img=${randomId}`;
  });

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    try {
      const csrfToken = await generateCsrf();
      await registerUser(username, password, email, avatar, csrfToken);
      setSuccess("Registration successful, redirecting to login...");
      setTimeout(() => navigate("/login"), 1600);
    } catch (err) {
      setError(
        "Registration failed. Try another username/email or check your input."
      );
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div style={{ textAlign: "center", margin: "8px 0" }}>
          <img
            src={avatar}
            alt="Avatar preview"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #eee",
            }}
            onError={(e) => (e.target.src = "https://i.pravatar.cc/80")}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
