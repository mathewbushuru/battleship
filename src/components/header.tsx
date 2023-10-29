import { cn } from "@/lib/ui-utils";

interface headerProps extends React.HTMLAttributes<HTMLDivElement> {}

function Header({ className, ...props }: headerProps) {
  return (
    <div
      className={cn("text-center text-5xl font-extrabold uppercase tracking-wider sm:text-6xl lg:text-7xl", className)}
      {...props}
    >
      Battleship
    </div>
  );
}

export default Header;
