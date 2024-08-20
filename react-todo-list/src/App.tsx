import './App.css'
import { useEffect, useRef, useState } from 'react'

interface Todo {
  id: number,
  title: string
  completed: boolean
}

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem("react-todos") || '[]'))

const [editingTodo , setEditingTodo] = useState<Todo | null>(null)
const [editingTodoTitle, setEditingTodoTitle] = useState<string>("")
const editingInput: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

  // 1. 할 일 목록 생성 - 사용자가 새로운 할 일을 입력할 수 있게 하는 기능.
  const createTodo = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.nativeEvent.isComposing) return
    if (event.key === "Enter") {

        // 불변성을 지키기 위한 새로운 JS 표준변수를 기억하자.
        const id = todos.length + 1
        const title = event.currentTarget.value;
        const completed = false

        const newTodo = {id, title, completed}
        setTodos([...todos, newTodo])

        event.currentTarget.value = ""
    }
  }

  const completeTodoToggle = (target:Todo) => {
    setTodos(todos.map(todo => todo == target ? {...todo , completed : !todo.completed} : todo));
  }

  const numberRemainingTodos = todos.filter(todo => !todo.completed).length;

  const deleteTodo = (target:Todo) => {
    setTodos(todos.filter((todo) => todo !== target));
  } 

  const updateTodo = (target: Todo): void => {
    setEditingTodo(target)
    setEditingTodoTitle(target.title)
  }

  const updateTodoTitleCancle = (): void => {
      setEditingTodo(null)
  }

  const updateTodoTitle = (event: React.KeyboardEvent<HTMLInputElement>, target: Todo) => {
    if (event.nativeEvent.isComposing) return
    if (event.key === "Enter") {
        const title: string = event.currentTarget.value
        setTodos(todos.map((todo) => todo === target ? {...todo, title} : todo))
        setEditingTodo(null)
    }
  }


  const [visibleFilter,setVisibleFilter] = useState("All")
  const filterTodo = (() => {
    switch (visibleFilter) {
      case 'All' : return todos;
      case 'Active': return todos.filter(todo => !todo.completed);
      case 'Completed': return todos.filter(todo => todo.completed);
    }
    return todos;
  })()
  const allFilter = () => {
    setVisibleFilter('All');
  }
  const activeFilter = () => {
    setVisibleFilter('Active');
  }
  const completedFilter = () => {
    setVisibleFilter('Completed');
  }

  const allCompletedToggle = () => {
    const allChecked = todos.every(todo=>todo.completed);
    setTodos(todos.map(todo => ({...todo, completed: !allChecked})))
  }
  const dleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }


  useEffect(() => {
    if(editingInput.current){
      editingInput.current.focus();
    }
  },[editingTodo]);

  useEffect(() => {
    localStorage.setItem("react-todos",JSON.stringify(todos))
  },[todos])
  
  return (
    <>
      <input type="text" placeholder="할일을 입력해주세요." onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => createTodo(event)} />

      <ol>
          {filterTodo.map((todo: Todo) => 
              <li key={todo.id} >
                  {editingTodo !== todo ? (
                      <>
                          <input type="checkbox" checked={todo.completed} onChange={() => completeTodoToggle(todo)} />
                          <span onDoubleClick={() => updateTodo(todo)}>{todo.title}</span>
                          <button onClick={() => deleteTodo(todo)}>X</button>
                      </>
                  ) : (
                        <input type="text"
                            ref={editingInput}
                            value={editingTodoTitle}
                            onChange={event=> setEditingTodoTitle(event.currentTarget.value)}
                            onBlur={updateTodoTitleCancle}
                            onKeyDown={(event) => updateTodoTitle(event, todo)}
                            autoFocus
                        />
                    )}
                </li>
            )}
        </ol>

        <div>남은 할일: {numberRemainingTodos}</div>
        <hr/>
        <div>{visibleFilter}</div>
        <div>
            <button onClick={() => allFilter()}>전체보기</button>
            <button onClick={() => activeFilter()}>해야할 일 보기</button>
            <button onClick={() => completedFilter()}>완료한 일 보기</button>
        </div>

        <hr/>

        <div>
            <button onClick={() => allCompletedToggle()}>전체완료토글</button>
            <button onClick={() => dleteCompletedTodos()}>완료된 할일 삭제</button>
        </div>
    </>
  )

}

export default App
