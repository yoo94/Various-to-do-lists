import { useRecoilState } from "recoil";
import { todosState } from "../recoil/atoms/todoState";

const CreateTodoList = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const createTodo = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.nativeEvent.isComposing) return
    if (event.key === "Enter") {

      // 불변성을 지키기 위한 새로운 JS 표준변수를 기억하자.
      const id = todos.length + 1
      const title = event.currentTarget.value;
      const completed = false

      const newTodo = { id, title, completed }
      setTodos([...todos, newTodo])

      event.currentTarget.value = ""
    }
  }
  return (
    <input type="text" placeholder="할일을 입력해주세요." onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => createTodo(event)} />
  )
}
export default CreateTodoList;