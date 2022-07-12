const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};

const gameFactory = () => {
  let boardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  console.log(boardArray)
  const player = [];
  let turn = 0;
  let status = "pending";

  const renderBoard = () => {
    boardArray.forEach((row, rowIndex) => {
      row.forEach((cellValue, columnIndex) => {
        document
          .querySelector("#board")
          .querySelector(`#board-row:nth-child(${rowIndex + 1})`)
          .querySelector(
            `.board-cell:nth-child(${columnIndex + 1})`
          ).innerHTML = cellValue;
      });
    });
  };

  const sendMessage = (msg) => {
    document.getElementById("message").innerHTML = `<p>${msg}</p>`;
  };

  const isWinner = () => {
    let finished = false;

    const h = ["00-01-02", "10-11-12", "20-21-22"]; // horizontal winning combination
    const v = ["00-10-20", "01-11-21", "02-12-22"]; // vertical winning combination
    const d = ["00-11-22", "20-11-02"]; //digonal winning combinatio

    [...h, ...v, ...d].forEach((move) => {
      let line = move.split("-");
      console.log(line);
      if (
        boardArray[line[0][0]][line[0][1]] ===
          boardArray[line[1][0]][line[1][1]] &&
        boardArray[line[1][0]][line[1][1]] ===
          boardArray[line[2][0]][line[2][1]] &&
        boardArray[line[0][0]][line[0][1]] !== ""
      ) {
        finished = true;
      }
    });
    return finished;
  };

  const isDaraw = () => {
    !boardArray.some((line) => line.includes(""));
  };

  const finish = (type) => {
    status = "pending";
    if (type === "draw") {
      sendMessage("Game end, its Draw-------");
    } else {
      sendMessage(`Game finished, ${player[turn].getName()} won the game`);
    }
  };

  const play = (move) => {
    if (status !== "running") {
      sendMessage("Please start the game first !!!");
    } else if (boardArray[move[0]][move[1]] === "") {
      boardArray[move[0]][move[1]] = player[turn].getSymbol();
      renderBoard();
console.log(boardArray)
      if (isWinner()) {
        finish("win");
      } else if (isDaraw()) {
        finish("draw");
      } else {
        turn = turn === 0 ? 1 : 0;
        sendMessage(`${player[turn].getName()} it's your turn`);
      }
    }
  };

  const start = () => {
    status = "running";
    player[0] = playerFactory(document.getElementById("player1").value, "X");
    player[1] = playerFactory(document.getElementById("player2").value, "0");

    if (!player[0].getName() || !player[1].getName()) {
      sendMessage("Both player name must be filled");
    } else {
      document.getElementById("start").style.display = "none";
      document.getElementById("restart").style.display = "block";
      document.getElementById("board").style.display = "block";

      renderBoard();
      sendMessage(`${player[turn].getName()} it's your turn`);
    }
  };

  const restart = () => {
    boardArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    turn = 0;
    document.getElementById("start").style.display = "block";
    document.getElementById("restart").style.display = "none";
    document.getElementById("board").style.display = "none";
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
    document.getElementById("message").innerHTML = "";
    renderBoard();
  };

  return { start, renderBoard, play, restart };
};

let game = gameFactory();
game.renderBoard();
