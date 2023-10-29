import { cn } from "@/lib/ui-utils";

function BoardCell({ row, col }: { row: number; col: number }) {
  return (
    <div className="border-secondary m-0.5 h-11 w-11 rounded-sm border">{`${row} ${col}`}</div>
  );
}

function BoardRow({ row }: { row: number }) {
  return (
    <div className="flex">
      {Array(10)
        .fill(null)
        .map((_, colIndex) => {
          return <BoardCell row={row} col={colIndex} key={colIndex} />;
        })}
    </div>
  );
}

interface boardGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function BoardGrid({ className, ...props }: boardGridProps) {
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      {Array(10)
        .fill(null)
        .map((_, rowIndex) => {
          return <BoardRow row={rowIndex} key={rowIndex} />;
        })}
    </div>
  );
}
