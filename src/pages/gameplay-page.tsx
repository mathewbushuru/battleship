import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/header";
import Typewriter from "@/components/typewriter";
import BoardGrid from "@/components/board-grid";
import EnemyBoardGrid from "@/components/enemy-board-grid";

import { useAppSelector } from "@/store/store";

function GamePlayPage() {
  const navigate = useNavigate();

  const nextFriendlyShipsToBePlaced = useAppSelector(
    (state) => state.ship.nextShipsToBePlaced,
  );
  const currentFriendlyShip = useAppSelector((state) => state.ship.currentShip);

  const isFriendlyPlacementComplete =
    nextFriendlyShipsToBePlaced.length === 0 &&
    currentFriendlyShip.name === "COMPLETE";

    useEffect(() => {
    if (!isFriendlyPlacementComplete){
      navigate("/placement")
    }
  }, [isFriendlyPlacementComplete]);

  return (
    <div
      className="min-h-screen px-6 pb-6 pt-6 sm:pt-3"
      data-testid="GameplayPage"
    >
      <Header />
      <Typewriter
        text="Awaiting your orders, Lieutenant..."
        className="mt-2 lg:mt-4"
      />
      <div className="mt-4 flex flex-col-reverse gap-4 xl:flex-row xl:justify-around">
        <div className="">
          <p className="text-center text-base font-extrabold uppercase tracking-wider text-secondary sm:text-lg lg:text-xl">
            Friendly waters
          </p>
          <BoardGrid />
        </div>
        <div className="">
          <p className="text-center text-base font-extrabold uppercase tracking-wider text-secondary sm:text-lg lg:text-xl">
            Enemy waters
          </p>
          <EnemyBoardGrid />
        </div>
      </div>
    </div>
  );
}

export default GamePlayPage;
