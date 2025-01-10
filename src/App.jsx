import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ModalWindow from "./ModalWindow.jsx"


export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setOpen(true)}>Открыть окно</button>
        <ModalWindow isOpen={open} closeModal={() => setOpen(false)} />
      </div>
    </>
  );
}

