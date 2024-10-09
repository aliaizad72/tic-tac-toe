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
    getArray: function() {
      return state;
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
    insert: function(index, symbol) {
      state[index] = symbol
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

const createPlayer = function(name) {
  const symbol = game.getSymbol();

  return {
    name, 
    symbol
  }
}

const doc = (function(){
  const playBtn = document.getElementById("play-btn");
  const pxname = document.getElementById("pxname");
  const poname = document.getElementById("poname");
  const form = document.getElementById("form")
  const boardDiv = document.getElementById("board");
  const currentplayer = document.getElementById("currentplayer");
  const announce = document.getElementById("announce");
  const restartBtn = document.getElementById("restart-btn");
  let currentPlayer;
  const players = [];
  playBtn.addEventListener("click", start)
  restartBtn.addEventListener("click", () => location.reload());

  function start() {
    restartBtn.classList.toggle("hidden");
    players.push(createPlayer(pxname.value), createPlayer(poname.value))
    form.remove();
    for(const div of boardDiv.children) {
      div.addEventListener("click", e => playRound(e))
    }
    currentPlayer = players[0];
    currentplayer.textContent = `${currentPlayer.name} (symbol : ${currentPlayer.symbol}), it is your turn.`
  }
  
  function playRound(e) {
    if(e.target.textContent === "" && !board.isWon()) {
      board.insert(Number(e.target.dataset.boardindex), currentPlayer.symbol);
      e.target.textContent = currentPlayer.symbol;

      if(board.isWon()) {
        announce.textContent = `${currentPlayer.name} won`
        currentplayer.classList.add("hidden")
      }

      if(board.isFull() && !board.isWon()) {
        announce.textContent = `The game ended in a draw`;
        currentplayer.classList.add("hidden")
      }

      currentPlayer = players.filter((player) => player != currentPlayer)[0]
      currentplayer.textContent = `${currentPlayer.name} (symbol : ${currentPlayer.symbol}), it is your turn.`
    } else {
      return
    };
  }
  
  return {
  }
})();


const game = (function() {
  const symbols = ["X", "O"];
  return {
    getSymbol: function() {
      return symbols.shift();
    }
  }
})();