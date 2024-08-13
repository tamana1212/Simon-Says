import { useEffect, useState } from "react";
import "./App.css";

const ButtonTypes = ["green", "red", "yellow", "blue"];

function App() {
  const [text, setText] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [comp, setComp] = useState<Array<string>>([]);
  const [user, setUser] = useState<Array<string>>([]);
  const [systemTurn, setSystemTurn] = useState<boolean>(true);

  useEffect(() => {
    comp.forEach((item, index) => {
      setTimeout(() => {
        const element = document.getElementById(item);
        if (element) {
          element.classList.add("active");
          setTimeout(() => {
            element.classList.remove("active");
          }, 500);
        }
      }, index * 1000);
    });
    setTimeout(() => {
      setSystemTurn(false);
    }, comp.length * 1000);
  }, [comp]);

  const startGame = () => {
    setText("");
    let random = ButtonTypes[Math.floor(Math.random() * ButtonTypes.length)];
    setComp((prev) => [...prev, random]);
  };

  const userTurn = (button: string) => {
    if (systemTurn) return;
    const array = [...user, button];
    setUser((prev) => [...prev, button]);
    document.getElementById(button)?.classList.add("active");
    setTimeout(() => {
      document.getElementById(button)?.classList.remove("active");
      let correctSeq = true;
      for (let i = 0; i < array.length; i++) {
        if (array[i] !== comp[i]) {
          correctSeq = false;
          break;
        }
      }
      if (!correctSeq) {
        setCount(0);
        setComp([]);
        setText("Play Again:(");
      }
      if (correctSeq && array.length === comp.length) {
        setTimeout(() => {
          setCount((prev) => prev + 1);
          setUser([]);
          startGame();
        }, 500);
      }
    }, 500);
  };

  return (
    <div className="simon-container ">
      <h1>Simon Says {text}</h1>
      <div className="game-board">
        {ButtonTypes.map((button) => (
          <div
            className={`color-button`}
            id={button}
            onClick={() => userTurn(button)}
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
          Score: <span id="score">{count}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
