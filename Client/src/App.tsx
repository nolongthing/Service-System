import { useState } from "react";
import Test from "./test";

function App() {
  const [n, setN] = useState(2);
  // const [m, setM] = useState(1);
  return (
    <div className="App">
      {n}
      <button onClick={() => { setN(n => n + 1) }}>点击</button>
      <Test
      />
    </div>
  );
}

export default App;
