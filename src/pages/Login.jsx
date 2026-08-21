import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Login() {
  const { login, signup } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLogin, setIsLogin] =
    useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
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
          {isLogin
            ? "Login"
            : "Create Account"}
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
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            {isLogin
              ? "Login"
              : "Sign Up"}
          </button>

        </form>

       <div className="auth-switch">
  {isLogin
    ? "No account yet? "
    : "Already registered? "}

  <button
    className="auth-link"
    type="button"
    onClick={() =>
      setIsLogin(!isLogin)
    }
  >
    {isLogin
      ? "Create account"
      : "Login"}
  </button>
</div>

      </div>
    </div>
  );
}

export default Login;
