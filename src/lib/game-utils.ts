export function computerPlaysArray() {
  const arr = [];
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      arr.push([row, col]);
    }
  }
  return shuffleArray<number[]>(arr);
}

export function getRandomInt(unincludedMax: number) {
  return Math.floor(Math.random() * unincludedMax);
}

export function placeShipsAutomatically() {
  let row: number, col: number, direction: "row" | "column";
  const invalidCells: number[][] = [];

  // carrier cells
  direction = getRandomInt(2) === 1 ? "row" : "column";
  let carrierCells;
  if (direction === "row") {
    row = getRandomInt(10);
    col = getRandomInt(6);
    carrierCells = [
      [row, col],
      [row, col + 1],
      [row, col + 2],
      [row, col + 3],
      [row, col + 4],
    ];
  } else {
    row = getRandomInt(6);
    col = getRandomInt(10);
    carrierCells = [
      [row, col],
      [row + 1, col],
      [row + 2, col],
      [row + 3, col],
      [row + 4, col],
    ];
  }
  invalidCells.push(...carrierCells);

  // battleship cells
  direction = getRandomInt(2) === 1 ? "row" : "column";
  let battleshipCells;
  if (direction === "row") {
    row = getRandomInt(10);
    col = getRandomInt(7);
    while (
      invalidCells.some((el) => {
        return (
          (el[0] === row && el[1] === col) ||
          (el[0] === row && el[1] === col + 1) ||
          (el[0] === row && el[1] === col + 2) ||
          (el[0] === row && el[1] === col + 3)
        );
      })
    ) {
      row = getRandomInt(10);
      col = getRandomInt(7);
    }
    battleshipCells = [
      [row, col],
      [row, col + 1],
      [row, col + 2],
      [row, col + 3],
    ];
  } else {
    row = getRandomInt(7);
    col = getRandomInt(10);
    while (
      invalidCells.some((el) => {
        return (
          (el[0] === row && el[1] === col) ||
          (el[0] === row + 1 && el[1] === col) ||
          (el[0] === row + 2 && el[1] === col) ||
          (el[0] === row + 3 && el[1] === col)
        );
      })
    ) {
      row = getRandomInt(7);
      col = getRandomInt(10);
    }
    battleshipCells = [
      [row, col],
      [row + 1, col],
      [row + 2, col],
      [row + 3, col],
    ];
  }
  invalidCells.push(...battleshipCells);

  // destroyer cells
  direction = getRandomInt(2) === 1 ? "row" : "column";
  let destroyerCells;
  if (direction === "row") {
    row = getRandomInt(10);
    col = getRandomInt(8);
    while (
      invalidCells.some((el) => {
        return (
          (el[0] === row && el[1] === col) ||
          (el[0] === row && el[1] === col + 1) ||
          (el[0] === row && el[1] === col + 2)
        );
      })
    ) {
      row = getRandomInt(10);
      col = getRandomInt(8);
    }
    destroyerCells = [
      [row, col],
      [row, col + 1],
      [row, col + 2],
    ];
  } else {
    row = getRandomInt(8);
    col = getRandomInt(10);
    while (
      invalidCells.some((el) => {
        return (
          (el[0] === row && el[1] === col) ||
          (el[0] === row + 1 && el[1] === col) ||
          (el[0] === row + 2 && el[1] === col)
        );
      })
    ) {
      row = getRandomInt(8);
      col = getRandomInt(10);
    }
    destroyerCells = [
      [row, col],
      [row + 1, col],
      [row + 2, col],
    ];
  }
  invalidCells.push(...destroyerCells);

  // submarine  cells
  direction = getRandomInt(2) === 1 ? "row" : "column";
  let submarineCells;
  if (direction === "row") {
    row = getRandomInt(10);
    col = getRandomInt(8);
    while (
      invalidCells.some((el) => {
        return (
          (el[0] === row && el[1] === col) ||
          (el[0] === row && el[1] === col + 1) ||
          (el[0] === row && el[1] === col + 2)
        );
      })
    ) {
      row = getRandomInt(10);
      col = getRandomInt(8);
    }
    submarineCells = [
      [row, col],
      [row, col + 1],
      [row, col + 2],
    ];
  } else {
    row = getRandomInt(8);
    col = getRandomInt(10);
    while (
      invalidCells.some((el) => {
        return (
          (el[0] === row && el[1] === col) ||
          (el[0] === row + 1 && el[1] === col) ||
          (el[0] === row + 2 && el[1] === col)
        );
      })
    ) {
      row = getRandomInt(8);
      col = getRandomInt(10);
    }
    submarineCells = [
      [row, col],
      [row + 1, col],
      [row + 2, col],
    ];
  }
  invalidCells.push(...submarineCells);

  // patroller cells
  direction = getRandomInt(2) === 1 ? "row" : "column";
  let patrollerCells;
  if (direction === "row") {
    row = getRandomInt(10);
    col = getRandomInt(9);
    while (
      invalidCells.some((el) => {
        return (
          (el[0] === row && el[1] === col) ||
          (el[0] === row && el[1] === col + 1)
        );
      })
    ) {
      row = getRandomInt(10);
      col = getRandomInt(9);
    }
    patrollerCells = [
      [row, col],
      [row, col + 1],
    ];
  } else {
    row = getRandomInt(9);
    col = getRandomInt(10);
    while (
      invalidCells.some((el) => {
        return (
          (el[0] === row && el[1] === col) ||
          (el[0] === row + 1 && el[1] === col)
        );
      })
    ) {
      row = getRandomInt(9);
      col = getRandomInt(10);
    }
    patrollerCells = [
      [row, col],
      [row + 1, col],
    ];
  }

  const allPlacedCells = {
    carrierCells,
    battleshipCells,
    destroyerCells,
    submarineCells,
    patrollerCells,
  };

  return allPlacedCells;
}

export function shuffleArray<T>(array: T[]) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
