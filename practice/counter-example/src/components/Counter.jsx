import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../counterSlice";

export default function Counter() {

    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <>
            <h2>{count}</h2>
            <button onClick={() => {dispatch(decrement());}}>
                -
            </button>
            <button onClick={() => {dispatch(reset());}}>
                Reset
            </button>
            <button onClick={() => {dispatch(increment());}}>
                +
            </button>
        </>
    )
}
