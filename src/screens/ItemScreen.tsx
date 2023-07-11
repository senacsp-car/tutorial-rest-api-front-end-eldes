import { useState } from 'react';

function ItemScreen() {

  const divisor = 12;
  // let dividendo = 3;
  const [dividendo, setDividendo] = useState(3);

  function incrementar() {
    // dividendo = dividendo + 1;
    setDividendo(dividendo + 1);
  }

  return (
    <div>
      <h1>{dividendo}</h1>
      <button onClick={incrementar}>Incrementar</button>
    </div>
    
  );
}

export default ItemScreen;