<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-title class="text-white">
        <v-icon icon="mdi-checkbook" class="mr-2" />
        Список дел
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8">
        <v-row class="mb-6">
          <v-col cols="12" md="4">
            <v-card variant="outlined">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold text-primary">{{ totalCount }}</div>
                <div class="text-caption text-grey">Всего задач</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold text-warning">{{ pendingCount }}</div>
                <div class="text-caption text-grey">Активных</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold text-success">{{ completedCount }}</div>
                <div class="text-caption text-grey">Выполнено</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card class="mb-6">
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" md>
                <v-text-field
                  v-model="newTaskTitle"
                  label="Что нужно сделать?"
                  placeholder="Введите название задачи..."
                  prepend-inner-icon="mdi-plus-circle"
                  variant="outlined"
                  hide-details
                  @keyup.enter="addTask"
                />
              </v-col>
              <v-col cols="12" md="auto" class="mt-3 mt-md-0">
                <v-btn
                  color="primary"
                  size="large"
                  :disabled="!newTaskTitle.trim()"
                  @click="addTask"
                  append-icon="mdi-arrow-right"
                >
                  Добавить
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            <v-icon icon="mdi-format-list-check" class="mr-2" />
            Задачи
          </v-card-title>
          
          <v-card-text v-if="tasks.length === 0" class="text-center py-8">
            <v-icon icon="mdi-clipboard-text-multiple-outline" size="64" color="grey-lighten-1" />
            <p class="text-grey mt-4">✨ Список пуст. Добавьте первую задачу!</p>
          </v-card-text>

          <v-list v-else class="bg-grey-lighten-4">
            <v-list-item
              v-for="task in tasks"
              :key="task.id"
              :class="{ 'bg-white': !task.completed }"
              class="mb-2 rounded-lg"
            >
              <v-row align="center">
                <v-col cols="auto" class="pr-2">
                  <v-checkbox
                    :model-value="task.completed"
                    @change="toggleTask(task.id)"
                    :color="task.completed ? 'success' : undefined"
                    hide-details
                    density="compact"
                  />
                </v-col>

                <v-col>
                  <v-list-item-title
                    :class="{
                      'text-decoration-line-through text-grey': task.completed,
                      'text-body-1': true
                    }"
                  >
                    {{ task.title }}
                  </v-list-item-title>
                </v-col>

                <v-col cols="auto" class="pl-2">
                  <v-btn
                    icon="mdi-close"
                    size="small"
                    color="error"
                    variant="text"
                    @click="removeTask(task.id)"
                  />
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="mt-6" variant="outlined">
          <GithubProfile username="bukabtw" />
        </v-card>
      </v-container>

      <v-snackbar
        v-model="notification.visible"
        :color="getNotificationColor(notification.type)"
        timeout="3000"
        location="top"
      >
        <v-icon :icon="getNotificationIcon(notification.type)" class="mr-2" />
        {{ notification.message }}

        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="notification.visible = false"
          >
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import GithubProfile from './components/GithubProfile.vue'

const tasks = ref([])
const newTaskTitle = ref('')
const notification = reactive({ message: '', type: 'info', visible: false })
const nextId = ref(1)
let notificationTimeout = null

const completedCount = computed(() => tasks.value.filter(t => t.completed).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.completed).length)
const totalCount = computed(() => tasks.value.length)

const getNotificationColor = (type) => {
  const colors = { info: 'info', success: 'success', error: 'error' }
  return colors[type] || 'info'
}

const getNotificationIcon = (type) => {
  const icons = { info: 'mdi-information', success: 'mdi-check-circle', error: 'mdi-alert-circle' }
  return icons[type] || 'mdi-information'
}

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

