import { useRecoilValue } from "recoil";
import { remainingTodosvalue } from "../recoil/selectors/remainingTodosValue";

const RemainingTodos = () => {
  const numberRemainingTodos = useRecoilValue(remainingTodosvalue)
  return (
    <>
      <div>남은 할일: {numberRemainingTodos}</div>
    </>
  )
};
export default RemainingTodos;