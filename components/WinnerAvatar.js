// Deterministic, colorful initial-based avatars for winners.
// Same name always maps to the same gradient, so avatars feel consistent.

const GRADIENTS = [
  'from-emerald-400 to-teal-600',
  'from-teal-400 to-cyan-600',
  'from-green-400 to-emerald-600',
  'from-amber-400 to-orange-500',
  'from-sky-400 to-blue-600',
  'from-lime-400 to-green-600',
  'from-cyan-400 to-teal-600',
  'from-teal-500 to-emerald-700',
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function WinnerAvatar({ name, size = 'md', float = false, badge = true }) {
  const gradient = GRADIENTS[hashString(name || '') % GRADIENTS.length];
  const initials = getInitials(name);

  const sizes = {
    sm: 'w-11 h-11 text-sm',
    md: 'w-14 h-14 md:w-16 md:h-16 text-base md:text-lg',
    lg: 'w-20 h-20 text-2xl',
  };

  return (
    <div className={`relative flex-shrink-0 ${float ? 'animate-float' : ''}`}>
      <div
        className={`${sizes[size]} rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center font-extrabold text-white shadow-lg ring-2 ring-white/70 select-none`}
        dir="ltr"
      >
        {initials}
      </div>
      {badge && (
        <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center ring-2 ring-white shadow-md">
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </div>
  );
}
