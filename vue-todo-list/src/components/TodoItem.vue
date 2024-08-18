<template>
  <li :class="{ completed: todo.completed, editing: isEditing }">
    <template v-if="!isEditing">
      <input type="checkbox" :checked="todo.completed" @click="toggleComplete" />
      <span @dblclick="editTodo">{{ todo.title }}</span>
      <button @click="deleteTodo">X</button>
    </template>
    <template v-else>
      <input type="text" v-model="editingTitle" @keydown.enter="updateTodo" @blur="cancelEdit" />
    </template>
  </li>
</template>

<script>
export default {
  props: ['todo', 'index'],
  data() {
    return {
      isEditing: false,
      editingTitle: this.todo.title
    }
  },
  methods: {
    toggleComplete() {
      this.$emit('toggle-complete', this.index);
    },
    editTodo() {
      this.isEditing = true;
    },
    updateTodo() {
      this.$emit('update-todo', this.index, this.editingTitle);
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editingTitle = this.todo.title;
    },
    deleteTodo() {
      this.$emit('delete-todo', this.index);
    }
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #999;
}
.editing > * {
  display: none;
}
.editing input[type="text"] {
  display: block;
}
</style>
