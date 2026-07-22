type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Reusable page layout wrapper that matches the navbar's horizontal spacing.
 * Uses `container mx-auto px-4` — same `px-4` as the navbar — for consistent
 * left/right padding across pages.
 */
export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <div className={`container mx-auto px-4 py-10 ${className}`}>
      {children}
    </div>
  );
}
