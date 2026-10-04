import React from 'react';

export const TelegramIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5',
  size,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Official Telegram Blue Circle */}
    <circle cx="12" cy="12" r="12" fill="#24A1DE" />
    {/* Official White Paper Plane */}
    <path
      d="M5.4 11.9L17.7 7.2c0.6-0.2 1.1 0.1 0.9 0.9l-2.1 9.9c-0.2 0.7-0.6 0.9-1.2 0.5l-3.2-2.4-1.5 1.5c-0.2 0.2-0.3 0.3-0.6 0.3l0.2-3.3 6-5.4c0.3-0.2-0.1-0.4-0.4-0.1l-7.4 4.7-3.2-1c-0.7-0.2-0.7-0.7 0.1-1z"
      fill="#FFFFFF"
    />
  </svg>
);

export const GithubIcon: React.FC<{ className?: string; size?: number; invert?: boolean }> = ({
  className = 'w-5 h-5',
  size,
  invert = false,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);
