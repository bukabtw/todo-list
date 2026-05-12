<template>
  <v-container class="py-6">
    <!-- Статистика задач -->
    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card variant="outlined">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold text-primary">{{ store.getters.totalCount }}</div>
            <div class="text-caption text-grey">Всего задач</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="outlined">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold text-warning">{{ store.getters.pendingCount }}</div>
            <div class="text-caption text-grey">Активных</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="outlined">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold text-success">{{ store.getters.completedCount }}</div>
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
              @keyup.enter="handleAddTask"
            />
          </v-col>
          <v-col cols="12" md="auto" class="mt-3 mt-md-0">
            <v-btn
              color="primary"
              size="large"
              :disabled="!newTaskTitle.trim()"
              @click="handleAddTask"
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
      
      <v-card-text v-if="store.getters.totalCount === 0" class="text-center py-8">
        <v-icon icon="mdi-clipboard-text-multiple-outline" size="64" color="grey-lighten-1" />
        <p class="text-grey mt-4">✨ Список пуст. Добавьте первую задачу!</p>
      </v-card-text>

      <v-list v-else class="bg-grey-lighten-4">
        <v-list-item
          v-for="task in store.getters.allTasks"
          :key="task.id"
          :class="{ 'bg-white': !task.completed }"
          class="mb-2 rounded-lg"
        >
          <v-row align="center">
            <v-col cols="auto" class="pr-2">
              <v-checkbox
                :model-value="task.completed"
                @change="store.dispatch('toggleTask', task.id)"
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
                @click="store.dispatch('removeTask', task.id)"
              />
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card>

    <v-btn
      v-if="store.getters.completedCount > 0"
      color="error"
      variant="outlined"
      class="mt-4"
      block
      @click="store.dispatch('clearCompleted')"
    >
      Очистить выполненные ({{ store.getters.completedCount }})
    </v-btn>

    <v-snackbar
      v-model="store.state.notification.visible"
      :color="getNotificationColor(store.state.notification.type)"
      timeout="3000"
      location="top"
    >
      <v-icon :icon="getNotificationIcon(store.state.notification.type)" class="mr-2" />
      {{ store.state.notification.message }}

      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="store.dispatch('hideNotification')"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const newTaskTitle = ref('')

const getNotificationColor = (type) => {
  const colors = { info: 'info', success: 'success', error: 'error' }
  return colors[type] || 'info'
}

const getNotificationIcon = (type) => {
  const icons = { info: 'mdi-information', success: 'mdi-check-circle', error: 'mdi-alert-circle' }
  return icons[type] || 'mdi-information'
}

const handleAddTask = () => {
  store.dispatch('addTask', newTaskTitle.value)
  newTaskTitle.value = ''
}

onMounted(() => {
  store.dispatch('loadTasks')
})
</script>
