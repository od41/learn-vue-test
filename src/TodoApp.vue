<template>
  <div>
    <div>
      <form data-test="form" id="create-todo" @submit.prevent="addTodo">
        <input data-test="new-todo" type="text" placeholder="New Todo"  v-model="tempTodo"/>
        <!-- <button type="submit">Add New Todo</button> -->
      </form>
    </div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      data-test="todo"
      :class="[todo.completed ? 'completed' : '']"
    >
      <div data-test="todo-title">{{todo.text}}</div>
      <input type="checkbox" data-test="todo-checkbox" v-model="todo.completed" />
      <button data-test="delete-button" @click="deleteTodo(todo.id-1)">Delete</button>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TodoApp',

  data(){
    return {
      tempTodo: '',

      todos: [
        {
          id: 1,
          text: 'Learn Vue.js 3 Unit Tests',
          completed: false
        }
      ],
    }
  },

  methods: {
    addTodo() {
      // do something
      this.todos.push({
        id: this.todos.length + 1,
        text: this.tempTodo,
        completed: false
      })
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
    }
  }
})
</script>
