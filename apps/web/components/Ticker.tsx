import cn from 'clsx';

export default function Ticker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative flex items-center', className)}>
      {children}
      {/* Absolute */}
      <div className="absolute right-0 translate-x-full">
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
}
