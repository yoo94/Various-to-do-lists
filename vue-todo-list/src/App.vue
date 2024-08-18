<template>
  <div>
    <input @keydown.enter="createTodo" type="text" placeholder="할일을 입력" />
    
    <todo-list 
      :todos="todos" 
      :filtered-todos="filteredTodos" 
      @toggle-complete="toggleComplete" 
      @update-todo="updateTodo" 
      @delete-todo="deleteTodo"
    />
    
    <div>남은 할일: {{ num_remaining_todos }}</div>
    <hr/>
    
    <todo-filters @filter="setFilter" />
    <todo-actions 
      @toggle-all="toggleAllTodos" 
      @delete-completed="deleteCompletedTodos" 
    />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';
import TodoFilters from './components/TodoFilters.vue';
import TodoActions from './components/TodoActions.vue';

export default {
  components: {
    TodoList,
    TodoFilters,
    TodoActions
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("vue-todo-list") || '[]'),
      editingTodo: null,
      editingTitle: "",
      visibilityFilter: "ALL"
    }
  },
  watch: {
    todos: {
      handler(prev,curr) {
        localStorage.setItem("vue-todo-list", JSON.stringify(prev))
      },
      deep:true
    }
  },
  computed: {
    num_remaining_todos() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    filteredTodos() {
      switch (this.visibilityFilter) {
        case "ALL":
          return this.todos;
        case "ACTIVE":
          return this.todos.filter(todo => !todo.completed);
        case "COMPLETED":
          return this.todos.filter(todo => todo.completed);
      }
    }
  },
  methods: {
    createTodo(event) {
      const title = event.target.value;
      this.todos.push({ title, completed: false });
      event.target.value = "";
    },
    toggleComplete(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
    updateTodo(index, title) {
      this.todos[index].title = title;
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    setFilter(filter) {
      this.visibilityFilter = filter;
    },
    toggleAllTodos() {
      const isAllCompleted = this.todos.every(todo => todo.completed);
      this.todos = this.todos.map(todo => ({ ...todo, completed: !isAllCompleted }));
    },
    deleteCompletedTodos() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
}
</script>
