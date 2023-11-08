<h1 align="center"> Battleship </h1>

The main purpose of this project is to explore testing in React while creating a Battleship game. I aim to achieve 100% test coverage by the end of development. I'm using `Vitest` as the unit testing framework, `JSDOM` as the running environment for the tests, and a combination of `@testing-library/react` and `@testing-library/jest-dom` for react testing utilities.

In addition, I am using `Redux` for React state management and `TailwindCSS` for styling. This project initially used `Zustand` for state management but I refactored it to use Redux so that I can get experience testing frontend apps that use either solution. Check out the Zustand code on this [branch](https://github.com/mathewbushuru/battleship/tree/zustand).

<!-- ![progress](./docs/current-progress1.jpg) -->

### Test Coverage

`1138 / 1143 lines of code being tested`

![test-coverage](./docs/coverage3.jpg)
<p align="center">
<img src="./docs//coverage-cmd3.jpg" width="400px" />
</p>

### Roadmap

- [x] App setup, styling, deployment
- [x] TDD setup and Vitest testing config
- [x] Start page
- [x] Ship placement page
- [ ] Gameplay page and gameplay loop
- [ ] Drag and drop for ships during placement
- [ ] Smarter computer player 
- [ ] Enable two players  online gameplay with Socket.io