
interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-primary ${className}`}>
      <span className="text-lg font-bold text-primary-foreground">P</span>
    </div>
  )
}

