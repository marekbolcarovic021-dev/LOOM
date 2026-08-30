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

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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

        <input
          type="password"
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

    </div>
  );
}

export default Register;