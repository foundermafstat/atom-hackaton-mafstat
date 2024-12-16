export function AngularPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-0 opacity-20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
    >
      <defs>
        <pattern
          id="angular-pattern"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
        >
          <path
            d="M0 0L50 0L100 50L100 100L50 100L0 50Z"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#angular-pattern)" />
    </svg>
  )
}

