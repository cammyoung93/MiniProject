import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import Logo from "../components/Logo";
import { Button, PhoneField, Field } from "../components/ui";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    // TODO: POST /api/v1/auth/login once the endpoint is provided.
    navigate("/map");
  }

  return (
    <div className="cc-screen cc-auth">
      <div className="cc-auth__logo">
        <Logo size={150} />
      </div>
      <h1 className="cc-auth__title">Log in</h1>

      <div className="cc-auth__form">
        <PhoneField
          placeholder="please enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Field
          type="password"
          placeholder="please enter password"
          leading={<Lock size={20} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/login" className="cc-auth__forgot">
          Forgot your Password
        </Link>

        <div className="cc-auth__cta">
          <Button onClick={signIn}>Sign in</Button>
        </div>
      </div>

      <div className="cc-divider">
        <span>Or Continue in with</span>
      </div>

      <div className="cc-social">
        <button className="cc-social__btn" aria-label="Continue with Google">
          <GoogleMark />
        </button>
        <button className="cc-social__btn" aria-label="Continue with Facebook">
          <FacebookMark />
        </button>
        <button className="cc-social__btn cc-social__btn--dark" aria-label="Continue with Apple">
          <AppleMark />
        </button>
      </div>

      <p className="cc-auth__foot">
        Don't have an account ? <Link to="/signup" className="cc-link">Sign up</Link>
      </p>
    </div>
  );
}

/* Provider marks kept as inline SVG so there are no external asset requests. */
function GoogleMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 34.9 26.7 36 24 36c-5.3 0-9.7-3.6-11.3-8.4l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41.9 35.3 44 30 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}
function FacebookMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="12" fill="#1877F2" />
      <path fill="#fff" d="M28 24h4l1-6h-5v-3c0-1.7.5-2.9 3-2.9h2.7V6.6C33.8 6.4 32 6.2 30 6.2c-4.2 0-7 2.5-7 7.1V18h-5v6h5v18h6V24z" />
    </svg>
  );
}
function AppleMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.8 1.1 9 .8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1.1 2.7-2.2.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.3-.9-2.3-3.5zM14.3 5.6c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.1z" />
    </svg>
  );
}
