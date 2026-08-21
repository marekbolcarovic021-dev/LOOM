import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function Register() {
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Create Firebase Authentication account
      const result = await signup(email, password);

      // Create Firestore user document
      await setDoc(doc(db, "users", result.user.uid), {

        profile: {
          name: email.split("@")[0],
          country: "Slovakia",
          currency: "EUR (€)",
          language: "English",
          avatar: "",
        },

        premium: {
          plan: "free",
          tokens: 3,
          expiresAt: null,
          source: null,
        },

        stats: {
          aiQuestions: 0,
          receiptScans: 0,
        },

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Account created!");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        Register
      </button>
    </form>
  );
}

export default Register;
