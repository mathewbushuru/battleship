import Header from "@/components/header";
import Blockquote from "@/components/ui/blockquote";
import Button from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import quotes from "@/lib/quotes";

function WelcomePage() {
  const chosenStartQuote = Math.floor(Math.random() * quotes.start.length);

  return (
    <div
      data-testid="WelcomePage"
      className="flex h-full flex-col justify-between space-y-4 px-6 py-16"
    >
      <Header />
      <Blockquote
        quote={quotes.start[chosenStartQuote].quote}
        author={quotes.start[chosenStartQuote].author}
      />
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          Your rank is:
          <Select defaultValue="lieutenant">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lieutenant">Lieutenant</SelectItem>
              <SelectItem value="commander">Commander</SelectItem>
              <SelectItem value="captain" disabled>Captain</SelectItem>
              <SelectItem value="viceadmiral" disabled>Vice Admiral</SelectItem>
              <SelectItem value="admiral" disabled>Admiral</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-center font-mono">
          Win more battles to unlock higher difficulties
        </p>
      </div>

      <Button size="lg" className="sm:mx-auto sm:max-w-sm">
        Enter Battle
      </Button>
    </div>
  );
}

export default WelcomePage;
