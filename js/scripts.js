// Tic Tac Toe Game v.1.0
// Created by: Elminster White - elminsterthewhite@gmail.com

"use strict";

// Code wrapped in a closure to avoid global variables
(function() {

    const buttons = document.querySelectorAll("[data-array]");
    const display0 = document.querySelector(".display0");
    const display1 = document.querySelector(".display1");
    const display2 = document.querySelector(".display2");
    const display3 = document.querySelector(".display3");
    const display4 = document.querySelector(".display4");
    const display5 = document.querySelector(".display5");
    const display6 = document.querySelector(".display6");
    const display7 = document.querySelector(".display7");
    const display8 = document.querySelector(".display8");
    const swButton = document.querySelector(".switch");
    const sides = document.querySelector(".sides");
    const info = document.querySelector(".info");
    
    // Main battleground array
    let arr = [];
    let gameOver = false;
    let playerAsX = false;
    let humanSide = "o";
    let AIside = "x";
    let moves;
    let refreshTime;
    
    // Start default game
    oneGame();

    function switchSides() {
      if (playerAsX === false) {
        playerAsX = true;
        humanSide = "x";
        AIside = "o";
      } else {
        playerAsX = false;
        humanSide = "o";
        AIside = "x";
      }
      console.log("Sides switched!");
      // Start new default game
      oneGame();
    }

    // Handle "Switch Sides" button
    swButton.addEventListener("click", switchSides);

    function oneGame() {
      // Reset timeout
      clearTimeout(refreshTime);
      // Reset all values and messages
      moves = 0;
      gameOver = false;
      // "1" is code for empty square
      arr = [1, 1, 1, 1, 1, 1, 1, 1, 1];
      sides.textContent = `You are playing as: ' ${humanSide} '`;
      info.textContent = "";
      console.clear();
      
      // Handle display, decode every "1" to blank space
      function display() {
        const arr2 = arr.map(function(oneElement) {
          if (oneElement === 1) {
            return "";
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
        if ((arrClicked !== humanSide && arrClicked !== AIside) && 
            (gameOver === false)) {
          arr[this.dataset.array] = humanSide;
          moves += 1;
          console.log("Player just moved!");
          winConditions();
          // Start next AI turn after checking if player or AI has won
          deepMind();
        } else {
          return; // Do nothing
        }
      }

      // Magic that makes deepMind alive
      function deepMind() {
        const r = randomNumber();
        
        function randomNumber() {          
          function randomRange(myMin, myMax) {
            return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
          }
          return randomRange(0, 8);
        }

        if (gameOver === true) {
          // Stop when game is finished
          return; 
        }

        // Block overwriting used square
        if (arr[r] !== AIside && arr[r] !== humanSide) {
          arr[r] = AIside;
          moves += 1;
          console.log("AI just moved!");
          winConditions();
        } else {
          // When it is impossible to write that square,
          // try again with another randomNumber
          deepMind();
        }
      }

      function AIWins() {
        refreshTime = setTimeout(oneGame, 5000);
        info.textContent = "Game over! You have lost!";
        console.log("AI just won!");
        gameOver = true;
      }

      function playerWins() {
        refreshTime = setTimeout(oneGame, 5000);
        info.textContent = "Congratulations! You have won!";
        console.log("Player just won!");
        gameOver = true;
      }

      function drawItis() {
        refreshTime = setTimeout(oneGame, 5000);
        info.textContent = "It was a draw!";
        console.log("It was a draw!");
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
          if (movesQuantity === 9 && notADraw === false) {
            drawItis();            
          } else {
            console.log("Testing for draw... It isn't draw!");
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
        // Some info for console log for testing purpose
        console.log(`-------- IT WAS TURN ${moves} --------`);
        console.log("---------- NEXT TURN ----------");
      }

      // AI should make first move only if player is playing as "o"
      if (playerAsX === false) {
        deepMind();
      } else {
        // In this case only refresh display at start and wait for player move
        display();
      }

      // Handle buttons
      buttons.forEach((button) => button.addEventListener("click", playerMoves));

    }

}());