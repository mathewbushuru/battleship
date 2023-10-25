import Header from "@/components/header";
import Blockquote from "@/components/ui/blockquote";

import quotes from "@/lib/quotes";

function WelcomePage() {
  const chosenStartQuote = Math.floor(Math.random() * quotes.start.length);

  return (
    <div data-testid="WelcomePage" className="space-y-4 px-6 py-8">
      <Header />
      <Blockquote
        quote={quotes.start[chosenStartQuote].quote}
        author={quotes.start[chosenStartQuote].author}
      />
    </div>
  );
}

export default WelcomePage;
