import Header from "@/components/header";
import Typewriter from "@/components/typewriter";
import BoardGrid from "@/components/board-grid";

function GamePlayPage() {
  return (
    <div
      className="min-h-screen px-6 pb-6 pt-6 sm:pt-3"
      data-testid="GameplayPage"
    >
      <Header />
      <Typewriter text="Awaiting your orders, Lieutenant..." className="mt-2" />
      <div className="mt-4 flex flex-col-reverse gap-4 lg:flex-row lg:justify-around">
        <div className="">
          <p className="text-center">Friendly waters</p>
          <BoardGrid />
        </div>
        <div className="">
          <p className="text-center">Enemy waters</p>
          <BoardGrid />
        </div>
      </div>
    </div>
  );
}

export default GamePlayPage;
