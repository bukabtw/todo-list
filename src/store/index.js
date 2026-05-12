import { createStore } from 'vuex'

const STORAGE_KEY = 'vue-todo-tasks'
const NEXT_ID_KEY = 'vue-todo-nextId'

export default createStore({
  state: {
    tasks: [],
    nextId: 1,
    notification: {
      message: '',
      type: 'info',
      visible: false
    }
  },

  mutations: {
    LOAD_TASKS(state) {
      const saved = localStorage.getItem(STORAGE_KEY)
      const savedId = localStorage.getItem(NEXT_ID_KEY)
      if (saved) state.tasks = JSON.parse(saved)
      if (savedId) state.nextId = parseInt(savedId, 10)
    },

    ADD_TASK(state, title) {
      state.tasks.push({
        id: state.nextId++,
        title,
        completed: false,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks))
      localStorage.setItem(NEXT_ID_KEY, String(state.nextId))
    },

    TOGGLE_TASK(state, id) {
      const task = state.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks))
        localStorage.setItem(NEXT_ID_KEY, String(state.nextId))
      }
    },

    REMOVE_TASK(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks))
      localStorage.setItem(NEXT_ID_KEY, String(state.nextId))
    },

    CLEAR_COMPLETED(state) {
      state.tasks = state.tasks.filter(t => !t.completed)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks))
      localStorage.setItem(NEXT_ID_KEY, String(state.nextId))
    },

    SHOW_NOTIFICATION(state, { message, type }) {
      state.notification = { message, type, visible: true }
    },

    HIDE_NOTIFICATION(state) {
      state.notification.visible = false
    }
  },

  actions: {
    loadTasks({ commit }) {
      commit('LOAD_TASKS')
    },

    addTask({ commit }, title) {
      if (!title.trim()) return
      commit('ADD_TASK', title.trim())
      commit('SHOW_NOTIFICATION', {
        message: 'Задача добавлена!',
        type: 'success'
      })
    },

    toggleTask({ commit, state }, id) {
      commit('TOGGLE_TASK', id)
      const task = state.tasks.find(t => t.id === id)
      if (task) {
        commit('SHOW_NOTIFICATION', {
          message: `Задача ${task.completed ? 'выполнена' : 'отменена'}`,
          type: task.completed ? 'success' : 'info'
        })
      }
    },

    removeTask({ commit, state }, id) {
      const task = state.tasks.find(t => t.id === id)
      commit('REMOVE_TASK', id)
      if (task) {
        commit('SHOW_NOTIFICATION', {
          message: `Задача "${task.title}" удалена`,
          type: 'error'
        })
      }
    },

    clearCompleted({ commit }) {
      commit('CLEAR_COMPLETED')
      commit('SHOW_NOTIFICATION', {
        message: 'Выполненные задачи очищены',
        type: 'success'
      })
    },

    hideNotification({ commit }) {
      commit('HIDE_NOTIFICATION')
    }
  },

  getters: {
    allTasks: state => state.tasks,
    completedTasks: state => state.tasks.filter(t => t.completed),
    pendingTasks: state => state.tasks.filter(t => !t.completed),
    completedCount: (state, getters) => getters.completedTasks.length,
    pendingCount: (state, getters) => getters.pendingTasks.length,
    totalCount: state => state.tasks.length,
    taskById: state => id => state.tasks.find(t => t.id === id),
    notification: state => state.notification
  }
})
