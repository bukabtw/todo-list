<template>
  <div id="app">
    <header>
      <h1>📝 Список дел</h1>
      <p>Всего: {{ totalCount }} | Активных: {{ pendingCount }} | Выполнено: {{ completedCount }}</p>
    </header>

    <AppNotification 
      :message="notification.message" 
      :type="notification.type" 
      :visible="notification.visible" 
      @close="notification.visible = false" 
    />

    <div class="add-task">
      <input 
        v-model="newTaskTitle" 
        @keyup.enter="addTask" 
        placeholder="Что нужно сделать?" 
        type="text" 
      />
      <button @click="addTask" :disabled="!newTaskTitle.trim()">Добавить</button>
    </div>

    <div class="task-list">
      <p v-if="tasks.length === 0">✨ Список пуст. Добавьте первую задачу!</p>
      <ul v-else>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" :checked="task.completed" @change="toggleTask(task.id)" />
          <span class="task-title">{{ task.title }}</span>
          <button class="remove-btn" @click="removeTask(task.id)">✕</button>
        </li>
      </ul>
    </div>

    <footer>
      <GithubProfile username="bukabtw" />
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import GithubProfile from './components/GithubProfile.vue'
import AppNotification from './components/AppNotification.vue'

const tasks = ref([])
const newTaskTitle = ref('')
const notification = reactive({ message: '', type: 'info', visible: false })
const nextId = ref(1)
let notificationTimeout = null

const completedCount = computed(() => tasks.value.filter(t => t.completed).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.completed).length)
const totalCount = computed(() => tasks.value.length)

const saveToLocalStorage = () => {
  localStorage.setItem('vue-todo-tasks', JSON.stringify(tasks.value))
  localStorage.setItem('vue-todo-nextId', String(nextId.value))
}

const loadFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('vue-todo-tasks')
  const savedNextId = localStorage.getItem('vue-todo-nextId')
  if (savedTasks) tasks.value = JSON.parse(savedTasks)
  if (savedNextId) nextId.value = parseInt(savedNextId, 10)
}

const showNotification = (message, type = 'info') => {
  if (notificationTimeout) {
    clearTimeout(notificationTimeout)
  }
  
  notification.message = message
  notification.type = type
  notification.visible = true

  notificationTimeout = setTimeout(() => {
    notification.visible = false
  }, 3000)
}

const addTask = () => {
  const title = newTaskTitle.value.trim()
  if (!title) return
  tasks.value.push({ id: nextId.value++, title, completed: false })
  saveToLocalStorage()
  newTaskTitle.value = ''
  showNotification('Задача добавлена!', 'success')
}

const toggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    saveToLocalStorage()
    showNotification(`Задача ${task.completed ? 'выполнена' : 'отменена'}`, 'success')
  }
}

const removeTask = (id) => {
  const index = tasks.value.findIndex(t => t.id === id)
  if (index !== -1) {
    const title = tasks.value[index].title
    tasks.value.splice(index, 1)
    saveToLocalStorage()
    showNotification(`Задача "${title}" удалена`, 'error')
  }
}

onMounted(loadFromLocalStorage)
</script>

<style scoped>
#app header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

#app header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 2rem;
}

#app header p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

#app .add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

#app .add-task input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

#app .add-task input:focus {
  outline: none;
  border-color: #667eea;
}

#app .add-task input::placeholder {
  color: #aaa;
}

#app .add-task button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  white-space: nowrap;
}

#app .add-task button:hover:not(:disabled) {
  background: #5a6fd6;
  transform: translateY(-2px);
}

#app .add-task button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

#app .task-list {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

#app .task-list p {
  text-align: center;
  color: #999;
  font-size: 1.1rem;
  margin: 20px 0;
}

#app .task-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

#app .task-list li {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

#app .task-list li:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

#app .task-list li input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-right: 15px;
  cursor: pointer;
  accent-color: #667eea;
}

#app .task-list li .task-title {
  flex: 1;
  font-size: 1rem;
  color: #333;
  transition: color 0.3s;
}

#app .task-list li.completed .task-title {
  text-decoration: line-through;
  color: #aaa;
}

#app .task-list li.completed {
  background: #f0f0f0;
}

#app .remove-btn {
  width: 32px;
  height: 32px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app .remove-btn:hover {
  background: #c82333;
  transform: scale(1.1);
}

#app footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 600px) {
  #app {
    padding: 10px;
  }

  #app header h1 {
    font-size: 1.5rem;
  }

  #app .add-task {
    flex-direction: column;
  }

  #app .add-task button {
    width: 100%;
  }

  #app .task-list li {
    padding: 12px;
  }

  #app .task-list li .task-title {
    font-size: 0.9rem;
  }

  #app .remove-btn {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
}
</style>
