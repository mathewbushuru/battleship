import { useEffect, useState } from "react";
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
  const [prevText, setPrevText] = useState<string>('');

  const arr: string[] = [text];
  useEffect(() => {
    if (text === prevText) {
      return
    }
    arr.push(text);
    setPrevText(text);
  }, [text]);

  return (
    <div
      className={cn(
        "mx-auto w-fit rounded-sm bg-primary px-4 py-1 text-left text-xs text-gray-300 sm:text-sm",
        className,
      )}
      {...props}
    >
      <p className="font-mono ">
        <Typed strings={arr} typeSpeed={delay}/>
      </p>
    </div>
  );
}

export default Typewriter;
