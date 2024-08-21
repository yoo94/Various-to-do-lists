import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Todo } from "../types/Todo";
import Button from "./Button";
import { useAppDispatch } from "../app/hooks";
import { _completeTodoToggle,_deleteTodo,_updateTodoTitle } from "../features/todos/todosSilce";

interface TodoItemProps {
  todoItem: Todo
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
}
const TodoItem = ({ todoItem, todos }: TodoItemProps) => {

  const editingInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState<string>("");

  const todoItemDispatch = useAppDispatch();


  const completeTodoToggle = (target: Todo) => todoItemDispatch(_completeTodoToggle(target))

  const deleteTodo = (target: Todo) => todoItemDispatch(_deleteTodo(target))

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
      todoItemDispatch(_updateTodoTitle({target,title}))
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