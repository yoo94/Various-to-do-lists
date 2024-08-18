<template>
  <ol>
    <todo-item
      v-for="(todo, index) in filteredTodos"
      :key="index"
      :todo="todo"
      :index="index"
      @toggle-complete="toggleComplete"
      @update-todo="updateTodo"
      @delete-todo="deleteTodo"
    />
  </ol>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  components: { TodoItem },
  props: ['todos', 'filteredTodos'],
  methods: {
    toggleComplete(index) {
      this.$emit('toggle-complete', index);
    },
    updateTodo(index, title) {
      this.$emit('update-todo', index, title);
    },
    deleteTodo(index) {
      this.$emit('delete-todo', index);
    }
  }
}
</script>
