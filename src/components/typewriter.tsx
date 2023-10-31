import { useEffect } from "react";
import Typed from "react-typed";

import { cn } from "@/lib/ui-utils";

interface typewriterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  delay?: number;
}

function Typewriter({
  text,
  delay = 20,
  className,
  ...props
}: typewriterProps) {
  const arr: string[] = [text];

  useEffect(() => {
    arr.push(text);
  }, [text]);

  return (
    <div
      className={cn(
        "mx-auto w-fit bg-primary py-1 px-4 text-xs sm:text-sm text-gray-300 rounded-sm text-left",
        className,
      )}
      {...props}
    >
      <p className="font-mono ">
        <Typed strings={arr} typeSpeed={delay} />
      </p>
    </div>
  );
}

export default Typewriter;
