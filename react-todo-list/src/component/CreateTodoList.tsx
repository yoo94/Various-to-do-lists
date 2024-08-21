import { useAppDispatch } from "../app/hooks"
import { _createTodo } from "../features/todos/todosSilce"


const CreateTodoList = () => {
  const CreateTodoDispatch = useAppDispatch()
  const createTodo = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.nativeEvent.isComposing) return
    if (event.key === "Enter") {
      CreateTodoDispatch(_createTodo(event.currentTarget.value))
      event.currentTarget.value = ''
    }
  }
  return (
    <input type="text" placeholder="할일을 입력해주세요." onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => createTodo(event)} />
  )
}
export default CreateTodoList;