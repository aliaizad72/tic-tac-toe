const prompt = require('prompt-sync')();

const userInterface = (function() {
  function isInputValid(input) {
    return isInRange(input) && board.spaceIsEmpty(Number(input));
  }

  function isInRange(input) {
    if (/^[1-9]$/.test(input)) {
      return true
    } else {
      console.log("Input can only be numbers from 1 to 9")
    }
  }

  return {
    welcome: function() {
      console.log("Welcome to Tic-Tac-Toe")
    },

    askName: function() {
      return prompt("Enter your name: ")
    },

    askInput: function(player) {
      let input = prompt(`${player.name} (symbol: ${player.symbol}), enter your choice: `);

      while (!isInputValid(input)) {
        input = prompt("Try again: ")
      }

      return input
    }
  }
})();

const board = (function() {
  let state = [...Array(9)].fill(" ");

  function getDisplayVal() {
    return state.map((val, ind) => {
      if (val === ' ') {
        return ind + 1;
      } else {
        return val;
      }
    });
  }

  let winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return {
    show: function() {
      const displayVal = getDisplayVal();
      console.log();
      console.log(` ${displayVal[0]} | ${displayVal[1]} | ${displayVal[2]} \n` +
                ` --------- \n` +
                ` ${displayVal[3]} | ${displayVal[4]} | ${displayVal[5]} \n` +
                ` --------- \n` +
                ` ${displayVal[6]} | ${displayVal[7]} | ${displayVal[8]} \n`);
    },
    isWon: function() {
      const displayVal = getDisplayVal();
      for(const condition of winningCondition) {
        if (displayVal[condition[0]] === displayVal[condition[1]] && displayVal[condition[1]] === displayVal[condition[2]]) {
          return true;
        }
      }

      return false;
    },
    spaceIsEmpty: function(index) {
      if(state[index - 1] === " ") {
        return true
      } else {
        console.log("Space selected is occupied!")
        return false
      }
    },
    insert: function(index, symbol) {
      state[index - 1] = symbol
    },
    isFull: function() {
      const filtered = state.filter((e) => e === " ")
      if(filtered.length === 0) {
        return true
      } else {
        return false
      }
    }
  }
})();

const createPlayer = function() {
  const name = userInterface.askName();
  const symbol = game.getSymbol();

  return {
    name, 
    symbol
  }
}


const game = (function() {
  const symbols = ["X", "O"];
  function round(players) {
    outer: while (!board.isWon()) {
      for(const player of players) {
        const input = userInterface.askInput(player);
        board.insert(input, player.symbol)
        board.show();

        if (board.isWon()) {
          console.log(`${player.name}, you won the game!`)
          break outer
        }

        if (board.isFull() && !board.isWon()) {
          console.log("The game ended in a draw");
          break outer;
        }
      }
    }
  }
  
  return {
    play: function() {
      userInterface.welcome();
      const players = [createPlayer(), createPlayer()];
      board.show();
      round(players);
    },
    getSymbol: function() {
      return symbols.shift();
    }
  }
})();

game.play();