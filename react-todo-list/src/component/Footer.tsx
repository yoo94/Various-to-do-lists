import { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import { Todo } from './types/Todo';

interface FooterProps {
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const Footer = ({ todos, setTodos }: FooterProps) => {
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