<h2 align="center"> Battleship </h1>

The main purpose of this project is to explore testing in React while creating a Battleship game. I'm using `Vitest` as the unit testing framework, `JSDOM` as the running environment for the tests, and a combination of `@testing-library/react` and `@testing-library/jest-dom` for react testing utilities.

<!-- ![progress](./docs/current-progress1.jpg) -->

##### Test Coverage

![test-coverage](./docs/coverage1.jpg)

##### Tech Stack 

`React` + `Vite`, `TypeScript`, `TailwindCSS`, `Redux`, `Vitest`, `React-testing-library`

##### Roadmap

- [x] React app configuration
- [x] Tailwind configuration
- [x] Testing with Vitest/ TDD setup
- [x] UI configuration - clsx, twMerge, cva, lucide icons
- [x] Deployment to Vercel 
- [ ] Ship parent component - parent to the PatrolBoat, SubMarine, Destroyer, BattleShip and Carrier components
- [ ] Implement individual ship components 
- [ ] GameBoard component - for player and opponent's boards
- [ ] Player component
- [ ] Main game loop
- [ ] Drag and drop for ships during game setup
- [ ] Smarter computer player 
- [ ] Enable two players local co-op 
- [ ] Enable two players  online gameplay