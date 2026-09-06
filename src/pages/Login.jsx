import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-logo-wrapper">
      </div>

      <div className="auth-card">

        <div className="auth-logo-container">

          <img
            src={logo}
            alt="LOOM"
            className="auth-logo"
          />

        </div>

        <h1>
          Login
        </h1>

        <p className="auth-subtitle">
          Your personal financial companion
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            autoComplete="email"
            required
          />

          <div className="password-input-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              title={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3l18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M10.58 10.58a2 2 0 0 0 2.83 2.83"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M9.88 5.09A10.9 10.9 0 0 1 12 4.88c5 0 8.73 3.11 10 7.12a11.6 11.6 0 0 1-3.07 4.68"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M6.61 6.61A11.7 11.7 0 0 0 2 12c1.27 4.01 5 7.12 10 7.12a10.9 10.9 0 0 0 2.12-.21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>

          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <div className="auth-switch">

          <span>
            No account yet?{" "}
          </span>

          <button
            className="auth-link"
            type="button"
            onClick={() =>
              navigate("/register")
            }
          >
            Create account
          </button>

        </div>

      </div>

      <a
        href="/about"
        className="auth-return-button"
      >
        <span className="auth-return-arrow">
          ←
        </span>

        <span>
          Return to About
        </span>
      </a>

    </div>
  );
}

export default Login;