/* Cheeky Charging wordmark: two rounded "C/D" halves forming a link, with a
 * lightning bolt through the middle, in the brand pink gradient. Rebuilt as
 * clean vector art so it stays crisp at any size / on any device. */

type Props = { size?: number; title?: string };

export default function Logo({ size = 92, title = "Cheeky Charging" }: Props) {
  const w = size;
  const h = size * 0.62;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 148 92"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ccLogo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbb6d9" />
          <stop offset="0.55" stopColor="#f56fb1" />
          <stop offset="1" stopColor="#e83a93" />
        </linearGradient>
      </defs>
      {/* Left "C" — thick arc opening right */}
      <path
        d="M70 14 H44 A32 32 0 1 0 44 78 H70 L58 60 H46 A14 14 0 1 1 46 32 H70 Z"
        fill="url(#ccLogo)"
      />
      {/* Right "D" — thick arc opening left */}
      <path
        d="M78 78 H104 A32 32 0 1 0 104 14 H78 L90 32 H102 A14 14 0 1 1 102 60 H78 Z"
        fill="url(#ccLogo)"
      />
      {/* Lightning bolt through the centre */}
      <path
        d="M84 8 L58 50 H72 L64 84 L92 40 H77 Z"
        fill="url(#ccLogo)"
        stroke="#fff"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
