import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import Logo from "../components/Logo";
import { Button, PhoneField, Field } from "../components/ui";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  return (
    <div className="cc-screen cc-auth cc-scroll">
      <div className="cc-auth__logo">
        <Logo size={140} />
      </div>
      <h1 className="cc-auth__title">Sign Up</h1>

      <div className="cc-auth__form">
        <Field placeholder="Please enter name" leading={<User size={20} />} />
        <PhoneField placeholder="Phone number" />
        <Field placeholder="Please enter email address" leading={<Mail size={20} />} />
        <Field type="password" placeholder="Password" leading={<Lock size={20} />} />

        <div className="cc-auth__cta">
          <Button disabled={!agree} onClick={() => navigate("/map")}>
            Send verification code
          </Button>
        </div>

        <label className="cc-agree">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>
            I agree to the <Link to="/help" className="cc-link">Terms and Conditions</Link>
          </span>
        </label>
      </div>

      <p className="cc-auth__foot">
        Already have an account ? <Link to="/login" className="cc-link">Log in</Link>
      </p>
    </div>
  );
}
