import { Send } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function SocialIcons({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="p-1.5 rounded-full hover:bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-white transition"
      >
        <InstagramIcon size={size} />
      </a>
      <a
        href="https://t.me/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="p-1.5 rounded-full hover:bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-white transition"
      >
        <Send size={size} />
      </a>
    </div>
  );
}
