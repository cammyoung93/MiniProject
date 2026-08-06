/* Shared UI kit — the building blocks every screen reuses so the pink brand
 * stays consistent. Kept in one file for now; split later if it grows. */
import type { ReactNode, InputHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ui.css";

/* ---- Button --------------------------------------------------------- */
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  type?: "button" | "submit";
  full?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
};

export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  full = true,
  disabled,
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cc-btn cc-btn--${variant} ${full ? "cc-btn--full" : ""}`}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}

/* ---- Text field ----------------------------------------------------- */
type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function Field({ leading, trailing, ...rest }: FieldProps) {
  return (
    <label className="cc-field">
      {leading && <span className="cc-field__lead">{leading}</span>}
      <input className="cc-field__input" {...rest} />
      {trailing && <span className="cc-field__trail">{trailing}</span>}
    </label>
  );
}

/* ---- Phone field (UK +44) ------------------------------------------- */
export function PhoneField(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="cc-field">
      <span className="cc-field__lead cc-phone">
        <span className="cc-flag" aria-hidden>🇬🇧</span>
        <span className="cc-cc">+44</span>
      </span>
      <input
        className="cc-field__input"
        inputMode="tel"
        placeholder="Phone number"
        {...props}
      />
    </label>
  );
}

/* ---- Screen top bar (pink circular back + centered title) ----------- */
export function TopBar({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <header className="cc-topbar">
      <button
        className="cc-topbar__back"
        aria-label="Back"
        onClick={onBack ?? (() => navigate(-1))}
      >
        <ChevronLeft size={22} strokeWidth={3} />
      </button>
      <h1 className="cc-topbar__title">{title}</h1>
      <div className="cc-topbar__right">{right}</div>
    </header>
  );
}

/* ---- Card ----------------------------------------------------------- */
export function Card({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`cc-card ${onClick ? "cc-card--tap" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

/* ---- List row (icon + label + chevron) ------------------------------ */
export function Row({
  icon,
  label,
  value,
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  value?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className="cc-row" onClick={onClick}>
      {icon && <span className="cc-row__icon">{icon}</span>}
      <span className="cc-row__label">{label}</span>
      <span className="cc-row__value">{value}</span>
      <ChevronRight size={20} className="cc-row__chev" />
    </button>
  );
}

/* ---- Section heading ------------------------------------------------ */
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="cc-section-title">{children}</h2>;
}

/* ---- Status pill ---------------------------------------------------- */
export function StatusPill({
  tone,
  children,
}: {
  tone: "green" | "red" | "amber";
  children: ReactNode;
}) {
  return <span className={`cc-status cc-status--${tone}`}>{children}</span>;
}
