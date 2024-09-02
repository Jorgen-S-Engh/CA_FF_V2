import useStore from "./store";

function Counter() {
  const count = useStore((state) => state.count);
  return <h1>{count} items in cart...</h1>;
}

export default Counter;
