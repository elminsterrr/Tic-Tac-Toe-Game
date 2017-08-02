'use strict';

(function () {
  const buttons = document.querySelectorAll('[data-array]');
  const display0 = document.querySelector('.display0');
  const display1 = document.querySelector('.display1');
  const display2 = document.querySelector('.display2');
  const display3 = document.querySelector('.display3');
  const display4 = document.querySelector('.display4');
  const display5 = document.querySelector('.display5');
  const display6 = document.querySelector('.display6');
  const display7 = document.querySelector('.display7');
  const display8 = document.querySelector('.display8');
  const swButton = document.querySelector('.switch');
  const sides = document.querySelector('.sides');
  const info = document.querySelector('.info');

  let arr = [];
  let gameOver = false;
  let playerAsX = false;
  let humanSide = 'o';
  let AIside = 'x';
  let moves;
  let refreshTime;

  function oneGame() {
    // Reset timeout
    clearTimeout(refreshTime);
    // Reset all values and messages
    moves = 0;
    gameOver = false;
    arr = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
    sides.textContent = `You are playing as: ' ${humanSide} '`;
    info.textContent = '';

    // Handle display
    function display() {
      const arr2 = arr.map(function(oneElement) {
        if (oneElement === 'empty') {
          return '';
        } else {
          return oneElement;
        }
      });

      display0.textContent = arr2[0];
      display1.textContent = arr2[1];
      display2.textContent = arr2[2];
      display3.textContent = arr2[3];
      display4.textContent = arr2[4];
      display5.textContent = arr2[5];
      display6.textContent = arr2[6];
      display7.textContent = arr2[7];
      display8.textContent = arr2[8];
    }

    // Decode user clicks to useful data
    function playerMoves() {
      const arrClicked = arr[this.dataset.array];
      // Block overwriting used square or adding moves after gameOver
      if ((arrClicked !== humanSide && arrClicked !== AIside) && (!gameOver)) {
        arr[this.dataset.array] = humanSide;
        moves += 1;
        winConditions();
        // Start next AI turn after checking if player or AI has won
        deepMind();
      } else {
        return; // Do nothing
      }
    }

    function deepMind() {
      const rand = randomNumber();
      // Select a random number between 0 and 8
      function randomNumber() {
        function randomRange(myMin, myMax) {
          return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
        }
        return randomRange(0, 8);
      }
      // Stop when game is finished
      if (gameOver) {
        return;
      }
      // Block overwriting used square
      if (arr[rand] !== AIside && arr[rand] !== humanSide) {
        arr[rand] = AIside;
        moves += 1;
        winConditions();
      } else {
        // When it is impossible to write that square,
        // try again with another randomNumber
        deepMind();
      }
    }

    function AIWins() {
      refreshTime = setTimeout(oneGame, 1500);
      info.textContent = 'Game over! You have lost!';
      gameOver = true;
    }

    function playerWins() {
      refreshTime = setTimeout(oneGame, 1500);
      info.textContent = 'Congratulations! You have won!';
      gameOver = true;
    }

    function drawItis() {
      refreshTime = setTimeout(oneGame, 1500);
      info.textContent = 'It was a draw!';
      gameOver = true;
    }

    // Test if player or AI wins or if is it a tie
    function winConditions() {
      let notADraw = false;
      display();

      function compareVariables(a, b, c) {
        if (a === b && b === c && c === a) {
          if (a === AIside) {
            notADraw = true;
            AIWins();
          } else if (a === humanSide) {
            notADraw = true;
            playerWins();
          } else {
            return; // Do nothing
          }
        }
      }

      function testForDraw(movesQuantity) {
        if (movesQuantity === 9 && !notADraw) {
          drawItis();
        }
      }

      // Testing all win conditions
      compareVariables(arr[0], arr[1], arr[2]);
      compareVariables(arr[3], arr[4], arr[5]);
      compareVariables(arr[6], arr[7], arr[8]);
      compareVariables(arr[0], arr[3], arr[6]);
      compareVariables(arr[1], arr[4], arr[7]);
      compareVariables(arr[2], arr[5], arr[8]);
      compareVariables(arr[0], arr[4], arr[8]);
      compareVariables(arr[2], arr[4], arr[6]);
      // Checking if it is a draw
      testForDraw(moves);
    }
    // AI should make first move only if player is playing as 'o'
    if (!playerAsX) {
      deepMind();
    } else {
      // In this case only refresh display at start and wait for player move
      display();
    }
    // Handle main Tic Tac Toe buttons
    buttons.forEach((button) => button.addEventListener('click', playerMoves));
    // Handle 'Switch Sides' button
    swButton.addEventListener('click', switchSides);
  }

  function switchSides() {
    if (!playerAsX) {
      playerAsX = true;
      humanSide = 'x';
      AIside = 'o';
    } else {
      playerAsX = false;
      humanSide = 'o';
      AIside = 'x';
    }

    // Start new default game
    oneGame();
  }

  // Start default game for first time
  oneGame();
}());
