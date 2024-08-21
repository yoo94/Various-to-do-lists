import { useRecoilState } from "recoil";
import Button from "./Button";
import { todosState } from "../recoil/atoms/todoState";

const Footer = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const allCompletedToggle = () => {
    const allChecked = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({ ...todo, completed: !allChecked })))
  }
  const dleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }
  return (
    <>
      <div>
        <Button onClickEvent={() => allCompletedToggle()}>전체완료토글</Button>
        <Button onClickEvent={() => dleteCompletedTodos()}>완료된 할일 삭제</Button>
      </div>
    </>
  )
}
export default Footer;