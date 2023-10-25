import Header from "@/components/header";
import Blockquote from "@/components/ui/blockquote";
import Button from "@/components/ui/button";

import quotes from "@/lib/quotes";

function WelcomePage() {
  const chosenStartQuote = Math.floor(Math.random() * quotes.start.length);

  return (
    <div
      data-testid="WelcomePage"
      className="flex flex-col justify-between space-y-4 px-6 py-16 h-full"
    >
      <Header />
      <Blockquote
        quote={quotes.start[chosenStartQuote].quote}
        author={quotes.start[chosenStartQuote].author}
      />
      <Button size="lg" className="sm:max-w-sm sm:mx-auto">Enter Battle</Button>
    </div>
  );
}

export default WelcomePage;
