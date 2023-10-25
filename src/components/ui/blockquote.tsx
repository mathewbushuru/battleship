interface blockquoteProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
}

function Blockquote({ quote, author }: blockquoteProps) {
  return (
    <div className="mx-auto max-w-md space-y-1 text-center text-base font-light italic text-stone-800 sm:text-lg">
      <blockquote data-testid="blockquote">"{quote}"</blockquote>
      <p className="text-right not-italic" data-testid="author">
        {author}
      </p>
    </div>
  );
}

export default Blockquote;
