import { useAppDispatch } from "../app/hooks";
import { _allCompletedToggle, _dleteCompletedTodos } from "../features/todos/todosSilce";
import Button from "./Button";

//todos={todos} setTodos={setTodos} 
const Footer = () => {
  const FooterDispatch = useAppDispatch();
  const allCompletedToggle = () => {
    FooterDispatch(_allCompletedToggle())
  }
  const dleteCompletedTodos = () => {
    FooterDispatch(_dleteCompletedTodos())
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