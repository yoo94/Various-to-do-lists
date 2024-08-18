import './style.css'

const todoList = document.getElementById("todo-list")

// 1. 할 일을 생성 - 사용자가 새로운 할 일을 입력할 수 있게 하는 기능.
// 기존화면 -> 행동(엔터키) -> 새로운 화면
function createTodo(todoData) {
    const {title, completed} = todoData

    const $li = $(`<li class="todo ${completed ? 'completed' : ''}">
                        <input type="checkbox" ${completed ? 'checked' : ''}><span class="title">${title}</span>
                        <input type="text" class="todo-edit-input">
                        <button class="del">X</button>
                    </li>`)
    $(todoList).append($li)
}


// 1) 선택
$("#todo-input").on("keydown", event => {
    if (event.isComposing) return
    if (event.key === "Enter") {

        // 3) 비지니스 로직
        const title = $(event.target).val()

        // 4) 화면 조작
        const todoData = {title, completed: false}
        createTodo(todoData)

        $(event.target).val("")
        updateRemainingTodos()
        saveTodos()
    }
})


// 2. 할 일 목록 표시 - 입력된 할 일을 목록 형태로 보여주는 기능.
// 3. 할 일 완료 표시 - 할 일의 완료 상태를 표시 및 변경할 수 있는 기능.
$(todoList).on("click", "input[type=checkbox]", event => {
    const $todo = $(event.target).closest(".todo").toggleClass("completed")
    const $checkbox = $todo.find("input[type='checkbox']")
    $checkbox.attr("checked", $todo.hasClass('completed'))
    updateRemainingTodos()
    saveTodos()
})

// 4. 할 일 개수 표시 - 전체 및 남아 있는 할 일의 개수를 표시하는 기능.
function updateRemainingTodos() {
    const num_remaining_todos = $(".todo:not(.completed)").length
    $("#num-reminded-todos").text(num_remaining_todos)
}

// 5. 할 일 삭제 - 목록에서 특정 할 일을 삭제하는 기능.
$(todoList).on("click", "button.del", event => {
    $(event.currentTarget).closest(".todo").remove()
    updateRemainingTodos()
    saveTodos()
})
// 6. 할 일 수정 - 이미 입력된 할 일의 내용을 수정하는 기능.
$(todoList).on("dblclick", "span.title", event => {
    const $title = $(event.currentTarget)
    const $todo = $title.closest(".todo").addClass("editing")
    const $input = $todo.find("input.todo-edit-input")
    $input.val($title.text()).focus()
})

$(todoList).on("keydown", "input.todo-edit-input", event => {
    if (event.isComposing) return
    if (event.key === "Enter") {
        const $input = $(event.currentTarget)
        const $todo = $input.closest(".todo")
        const $title = $todo.find("span.title")
        $title.text($input.val())
        $todo.removeClass("editing")
        saveTodos()
    }
})

$(todoList).on("blur", "input.todo-edit-input", event => {
    $(event.currentTarget).closest(".todo").removeClass("editing")
})

// 7. 할 일 필터링 - 완료된 할 일과 진행 중인 할 일을 구분하여 볼 수 있는 필터 기능.
$("#btn-show-all").click(() => $(todoList).attr("data-filter", "all"))
$("#btn-show-active").click(() => $(todoList).attr("data-filter", "active"))
$("#btn-show-completed").click(() => $(todoList).attr("data-filter", "completed"))

// 8. 할 일 일괄 처리 - 모든 할 일을 한 번에 완료 처리할 수 있는 기능.
$("#btn-toggle-all").click(event => {
    const isAllChecked = [...$(todoList).find(".todo")].every(todo => $(todo).hasClass("completed"))

    $(todoList).find(".todo").each((index, todo) => {
        if (isAllChecked) {
            $(todo).removeClass("completed")
            const checkbox = $(todo).find("input[type='checkbox']")
            checkbox.attr("checked", false)
        } else {
            $(todo).addClass("completed")
            const checkbox = $(todo).find("input[type='checkbox']")
            checkbox.attr("checked", true)
        }
    })
})

// 9. 할 일 일괄 삭제 - '완료된 할 일만'을 선택적으로 일괄 삭제하는 기능.
$("#btn-clear-completed").click(() => {
    $(todoList).find(".todo.completed").each((index, todo) => $(todo).remove())
    updateRemainingTodos()
    saveTodos()
})

// 10. 지속성 - 데이터를 지속적으로 저장하여, 웹 페이지 새로고침 후에도 할 일 목록을 유지하는 기능.
function saveTodos() {
    const savedTodos = [...$(todoList).find(".todo")].map(todo => {
        const title = $(todo).find("span.title").text()
        const completed = $(todo).hasClass("completed")
        return {title, completed}
    })

    localStorage.setItem("todos", JSON.stringify(savedTodos))
}

// 직렬화
const savedTodos = JSON.parse(localStorage.getItem("todos") || '[]')

// 역직렬화
savedTodos.forEach(todoData => {
    createTodo(todoData)
})

updateRemainingTodos()
