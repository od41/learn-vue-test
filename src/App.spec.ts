import { mount, shallowMount } from '@vue/test-utils'
import App from './App.vue'
import TodoApp from './TodoApp.vue'

test('renders a todo', () => {
  const wrapper = mount(TodoApp)

  const todo = wrapper.find('[data-test="todo"]')
  expect(todo.exists()).toBe(true)
})

test('creates a todo', async ()=>{
  const wrapper = mount(TodoApp)
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)

  await wrapper.get('[data-test="new-todo"]').setValue('New todo')
  await wrapper.get('[data-test="form"]').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)

})

test('completes a task', async ()=> {
  const wrapper = mount(TodoApp)
  expect(wrapper.findAll('[data-test="todo"')).toHaveLength(1)

  await wrapper.get('[data-test="todo-checkbox"]').setValue(true)
  expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
})

// it checks the list of todos if it's reduced. But, there can be a case where it deletes the wrong todo
test('delete a task', async ()=> {
  const wrapper = mount(TodoApp)
  await wrapper.get('[data-test="new-todo"]').setValue('New todo')
  await wrapper.get('[data-test="form"]').trigger('submit')

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)

  await wrapper.find('[data-test="delete-button"]').trigger('click')

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)


  // expect(wrapper.find('[data-test="todo"]').exists()).toBe(false)
}) 


// //////////////////////////////////////////////////////////////////////////////

// check if it deleted the right task
// test('delete a task', async ()=> {
//   const wrapper = mount(TodoApp)
//   const newTitle = 'New todo'
//   let isMatch = true
//   await wrapper.get('[data-test="new-todo"]').setValue(newTitle)
//   await wrapper.get('[data-test="form"]').trigger('submit')

//   expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)

//   await wrapper.find('[data-test="delete-button"]').trigger('click')

//   const allTodos = wrapper.findAll('[data-test="todo-title"]')
//   for(let td in allTodos) {
//     // console.log( allTodos[td].text())
//     if(allTodos[td].text() == newTitle){
//       isMatch = false
//     }
//   }

//   expect(isMatch).toBe(false)
// })