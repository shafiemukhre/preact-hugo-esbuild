import { h, render } from 'preact';
import { useState } from 'preact/hooks';

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  // You can also pass a callback to the setter
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

//Render Preact component in a single root
render(<Counter/>, document.getElementById('root'));

//Render Preact component in multiple roots
const roots = document.querySelectorAll('.widget');
roots.forEach( root => {
  render(<Counter/>, root)
})