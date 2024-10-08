import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Todo } from "../types/Todo";
import Button from "./Button";

interface TodoItemProps {
  todoItem: Todo
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>

}
const TodoItem = ({ todoItem, todos, setTodos }: TodoItemProps) => {

  const editingInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState<string>("");

  const completeTodoToggle = (target: Todo) => {
    setTodos(todos.map(todo => todo == target ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (target: Todo) => {
    setTodos(todos.filter((todo) => todo !== target));
  };

  const updateTodo = (target: Todo): void => {
    setEditingTodo(target)
    setEditingTodoTitle(target.title)
  };

  const updateTodoTitleCancle = (): void => {
    setEditingTodo(null)
  };

  const updateTodoTitle = (event: React.KeyboardEvent<HTMLInputElement>, target: Todo) => {
    if (event.nativeEvent.isComposing) return
    if (event.key === "Enter") {
      const title: string = event.currentTarget.value
      setTodos(todos.map((todo) => todo === target ? { ...todo, title } : todo))
      setEditingTodo(null)
    }
  };

  useEffect(() => {
    if (editingInput.current) {
      editingInput.current.focus();
    }
  }, [editingTodo]);

  return (
    <li key={todoItem.id} >
      {editingTodo !== todoItem ? (
        <>
          <input type="checkbox" checked={todoItem.completed} onChange={() => completeTodoToggle(todoItem)} />
          <span onDoubleClick={() => updateTodo(todoItem)}>{todoItem.title}</span>
          <Button onClickEvent={() => deleteTodo(todoItem)}>X</Button>
        </>
      ) : (
        <input type="text"
          ref={editingInput}
          value={editingTodoTitle}
          onChange={event => setEditingTodoTitle(event.currentTarget.value)}
          onBlur={updateTodoTitleCancle}
          onKeyDown={(event) => updateTodoTitle(event, todoItem)}
          autoFocus
        />
      )}
    </li>
  )
}
export default TodoItem;