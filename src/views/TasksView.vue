<template>
  <BasePage>
    <template #header>{{ $t('app.title') }}</template>

    <BaseCard>
      <template #title>
        <v-icon icon="mdi-format-list-check" class="mr-2" />
        {{ $t('tasks.total') }}: {{ store.getters.totalCount }} 
        | {{ $t('tasks.active') }}: {{ store.getters.pendingCount }} 
        | {{ $t('tasks.completed') }}: {{ store.getters.completedCount }}
      </template>
    </BaseCard>

    <v-snackbar
      v-model="store.state.notification.visible"
      :color="getNotificationColor(store.state.notification.type)"
      timeout="3000"
      location="top"
    >
      <v-icon :icon="getNotificationIcon(store.state.notification.type)" class="mr-2" />
      {{ translateNotification(store.state.notification.message) }}
      <template v-slot:actions>
        <v-btn variant="text" @click="store.dispatch('hideNotification')">✕</v-btn>
      </template>
    </v-snackbar>

    <BaseCard>
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="newTaskTitle"
            :placeholder="$t('tasks.addPlaceholder')"
            variant="outlined"
            prepend-icon="mdi-plus-circle"
            hide-details
            @keyup.enter="handleAddTask"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="primary"
            size="large"
            :disabled="!newTaskTitle.trim()"
            @click="handleAddTask"
            append-icon="mdi-arrow-right"
          >
            {{ $t('tasks.addButton') }}
          </v-btn>
        </v-col>
      </v-row>
    </BaseCard>

    <BaseList
      :items="store.getters.allTasks"
      :empty-text="$t('tasks.emptyList')"
      empty-icon="mdi-clipboard-text-multiple-outline"
    >
      <template #item="{ item }">
        <v-list-item
          :class="item.completed ? 'bg-grey-lighten-3' : 'bg-white'"
          class="mb-2 rounded-lg"
          elevation="2"
        >
          <template v-slot:prepend>
            <v-checkbox
              :model-value="item.completed"
              @change="store.dispatch('toggleTask', item.id)"
              :color="item.completed ? 'success' : undefined"
              hide-details
              density="compact"
            />
          </template>
          <v-list-item-title 
            :class="{ 
              'text-decoration-line-through text-grey': item.completed,
              'text-body-1': true 
            }"
          >
            {{ item.title }}
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
              icon="mdi-close"
              size="small"
              color="error"
              variant="text"
              @click="confirmDelete(item)"
            />
          </template>
        </v-list-item>
      </template>
    </BaseList>

    <BaseCard v-if="store.getters.completedCount > 0">
      <template #title>
        <v-icon icon="mdi-delete-sweep" class="mr-2" color="error" />
        Очистка выполненных
      </template>
      <template #actions>
        <v-btn
          color="error"
          variant="outlined"
          block
          @click="showClearConfirm = true"
        >
          {{ $t('tasks.clearCompleted') }} ({{ store.getters.completedCount }})
        </v-btn>
      </template>
    </BaseCard>

    <ConfirmDialog
      v-model="showDeleteConfirm"
      @confirm="handleDelete"
      @cancel="showDeleteConfirm = false"
    >
      <template #title>{{ deleteTarget?.title }}</template>
      <template #confirmText>Удалить</template>
      <template #cancelText>Отмена</template>
    </ConfirmDialog>

    <ConfirmDialog
      v-model="showClearConfirm"
      @confirm="handleClearCompleted"
      @cancel="showClearConfirm = false"
    >
      <template #title>Очистить выполненные?</template>
      <template #confirmText>Очистить</template>
      <template #cancelText>Отмена</template>
    </ConfirmDialog>
  </BasePage>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import BasePage from '../components/BasePage.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseList from '../components/BaseList.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const store = useStore()
const { t } = useI18n()

const newTaskTitle = ref('')
const showDeleteConfirm = ref(false)
const showClearConfirm = ref(false)
const deleteTarget = ref(null)

const translateNotification = (message) => {
  const translations = {
    'Задача добавлена!': t('tasks.taskAdded'),
    'Задача выполнена': t('tasks.taskCompleted'),
    'Задача отменена': t('tasks.taskCancelled'),
    'Выполненные задачи очищены': t('tasks.completedCleared')
  }
  if (message.includes('удалена')) {
    const title = message.match(/"(.+)"/)?.[1] || ''
    return t('tasks.taskDeleted', { title })
  }
  return translations[message] || message
}

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

const confirmDelete = (task) => {
  deleteTarget.value = task
  showDeleteConfirm.value = true
}

const handleDelete = () => {
  if (deleteTarget.value) {
    store.dispatch('removeTask', deleteTarget.value.id)
    deleteTarget.value = null
  }
  showDeleteConfirm.value = false
}

const handleClearCompleted = () => {
  store.dispatch('clearCompleted')
  showClearConfirm.value = false
}

onMounted(() => {
  store.dispatch('loadTasks')
})
</script>
