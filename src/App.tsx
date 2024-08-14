import { useEffect, useState } from "react";
import "./App.css";

const ButtonTypes = ["green", "red", "yellow", "blue"];

function App() {
  const [message, setMessage] = useState<string>("Click 'Start' to Play");
  const [score, setScore] = useState<number>(0);
  const [comp, setComp] = useState<Array<string>>([]);
  const [userSequence, setUserSequence] = useState<Array<string>>([]);
  const [isSystemTurn, setIsSystemTurn] = useState<boolean>(false);

  useEffect(() => {
    if (isSystemTurn) {
      playSequence();
    }
  }, [isSystemTurn, comp]);

  const playSequence = () => {
    comp.forEach((color, index) => {
      setTimeout(() => {
        activateButton(color);
      }, index * 1000);
    });

    setTimeout(() => {
      setMessage("Your Turn");
      setIsSystemTurn(false);
    }, comp.length * 1000);
  };

  const activateButton = (color: string) => {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add("active");
      setTimeout(() => {
        button.classList.remove("active");
      }, 500);
    }
  };

  const startGame = () => {
    setMessage("Watch the Sequence");
    setScore(0);
    setComp([]);
    setUserSequence([]);
    addColorToSequence();
  };

  const addColorToSequence = () => {
    const randomColor =
      ButtonTypes[Math.floor(Math.random() * ButtonTypes.length)];
      setComp((prev) => [...prev, randomColor]);
    setIsSystemTurn(true);
    setUserSequence([]);
  };

  const handleUserClick = (color: string) => {
    if (isSystemTurn) return;

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);
    activateButton(color);

    if (!checkUserSequence(newUserSequence)) {
      setMessage("Incorrect! Try Again.");
      setComp([]);
      setUserSequence([]);
      setIsSystemTurn(false);
      return;
    }

    if (newUserSequence.length === comp.length) {
      setScore((prev) => prev + 1);
      setMessage("Well Done! Watch the Next Sequence.");
      setTimeout(addColorToSequence, 1000);
    }
  };

  const checkUserSequence = (sequence: string[]) => {
    return sequence.every((color, index) => color === comp[index]);
  };

  return (
    <div className="simon-container">
      <h1>Simon Says: {message}</h1>
      <div className="game-board">
        {ButtonTypes.map((color) => (
          <div
            key={color}
            className={`color-button ${color}`}
            id={color}
            onClick={() => handleUserClick(color)}
          ></div>
        ))}
      </div>
      <div className="controls">
        {comp.length === 0 && (
          <button id="start-button" onClick={startGame}>
            Start Game
          </button>
        )}
        <div className="score">
          Score: <span id="score">{score}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
