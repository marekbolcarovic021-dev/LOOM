import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

function Register() {
  const { signup } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    // --------------------------------------------------
    // TERMS MUST BE ACCEPTED
    // --------------------------------------------------

    if (!acceptedTerms) {
      setError(
        t("mustAgreeToTerms") ||
          "You must agree to the Terms & Conditions before creating an account."
      );

      return;
    }

    // --------------------------------------------------
    // BASIC VALIDATION
    // --------------------------------------------------

    if (!email.trim()) {
      setError(
        t("enterEmail") ||
          "Please enter your email address."
      );

      return;
    }

    if (password.length < 6) {
      setError(
        t("passwordTooShort") ||
          "Password must contain at least 6 characters."
      );

      return;
    }

    setLoading(true);

    try {
      // ------------------------------------------------
      // CREATE FIREBASE AUTH ACCOUNT
      // ------------------------------------------------

      const result =
        await signup(
          email.trim(),
          password
        );

      // ------------------------------------------------
      // CREATE FIRESTORE USER DOCUMENT
      // ------------------------------------------------

      await setDoc(
        doc(
          db,
          "users",
          result.user.uid
        ),
        {
          profile: {
            name:
              email
                .split("@")[0]
                .trim(),

            country:
              "Slovakia",

            currency:
              "EUR (€)",

            language:
              "English",

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

          // --------------------------------------------
          // LEGAL ACCEPTANCE RECORD
          // --------------------------------------------

          legal: {
            termsAccepted: true,

            termsVersion:
              "2026-08-30",

            termsAcceptedAt:
              serverTimestamp(),
          },

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),
        }
      );

      // ----------------------------------------------
      // REDIRECT AFTER REGISTRATION
      // ----------------------------------------------

      window.location.href = "/";

    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error
      );

      setError(
        error.message ||
          t("registrationFailed") ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">

      <form
        className="register-form"
        onSubmit={handleSubmit}
      >

        <h1>
          {t("register") || "Register"}
        </h1>

        {/* --------------------------------------------
            EMAIL
        --------------------------------------------- */}

        <input
          type="email"
          placeholder={
            t("email") || "Email"
          }
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          autoComplete="email"
          required
        />

        {/* --------------------------------------------
            PASSWORD
        --------------------------------------------- */}

        <div className="password-input-wrapper">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder={
              t("password") ||
              "Password"
            }
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            autoComplete="new-password"
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

        {/* --------------------------------------------
            TERMS
        --------------------------------------------- */}

        <div className="terms-agreement">

          <label className="terms-checkbox">

            <input
              type="checkbox"
              checked={
                acceptedTerms
              }
              onChange={(e) =>
                setAcceptedTerms(
                  e.target.checked
                )
              }
            />

            <span className="terms-checkmark">
              {acceptedTerms
                ? "✓"
                : ""}
            </span>

            <span className="terms-text">

              {t(
                "agreeToTerms"
              ) ||
                "I have read and agree to the"}

              {" "}

              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                {t(
                  "termsAndConditions"
                ) ||
                  "Terms & Conditions"}
              </a>

            </span>

          </label>

        </div>

        {/* --------------------------------------------
            ERROR
        --------------------------------------------- */}

        {error && (

          <div className="register-error">
            {error}
          </div>

        )}

        {/* --------------------------------------------
            REGISTER
        --------------------------------------------- */}

        <button
          type="submit"
          disabled={
            !acceptedTerms ||
            loading
          }
          className={
            !acceptedTerms ||
            loading
              ? "register-disabled"
              : ""
          }
        >

          {loading
            ? t("creatingAccount") ||
              "Creating account..."
            : t("register") ||
              "Register"}

        </button>

      </form>

      {/* --------------------------------------------
          RETURN TO ABOUT
      --------------------------------------------- */}

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

export default Register;