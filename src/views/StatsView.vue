<template>
  <v-container class="py-8">
    <div class="text-h5 text-center mb-6">
      <v-icon icon="mdi-chart-bar" class="mr-2" />
      Статистика задач
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card color="primary" class="text-white text-center pa-6" elevation="4">
          <v-icon size="64" class="mb-2">mdi-check-circle</v-icon>
          <div class="text-h3 font-weight-bold">{{ store.getters.completedCount }}</div>
          <div class="text-subtitle-1">Выполнено</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card color="warning" class="text-white text-center pa-6" elevation="4">
          <v-icon size="64" class="mb-2">mdi-progress-clock</v-icon>
          <div class="text-h3 font-weight-bold">{{ store.getters.pendingCount }}</div>
          <div class="text-subtitle-1">В процессе</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card color="info" class="text-white text-center pa-6" elevation="4">
          <v-icon size="64" class="mb-2">mdi-list-box</v-icon>
          <div class="text-h3 font-weight-bold">{{ store.getters.totalCount }}</div>
          <div class="text-subtitle-1">Всего</div>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-6 pa-6" elevation="2">
      <v-card-title class="text-h6">
        <v-icon icon="mdi-chart-line" class="mr-2" />
        Прогресс выполнения
      </v-card-title>
      
      <v-progress-linear
        :model-value="progress"
        color="primary"
        height="25"
        rounded
        class="mt-2"
      >
        <template v-slot:default>
          <span class="text-white font-weight-bold">{{ progress }}%</span>
        </template>
      </v-progress-linear>
    </v-card>

    <v-card class="mt-6" v-if="store.getters.completedCount > 0" elevation="2">
      <v-card-title class="text-h6">
        <v-icon icon="mdi-check-all" class="mr-2" color="success" />
        Выполненные задачи
      </v-card-title>

      <v-divider />

      <v-list density="compact">
        <v-list-item
          v-for="task in store.getters.completedTasks"
          :key="task.id"
          class="py-2"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-check-circle" color="success" size="small" class="mr-2" />
          </template>
          
          <v-list-item-title class="text-decoration-line-through text-grey">
            {{ task.title }}
          </v-list-item-title>
          
          <template v-slot:append>
            <v-chip size="x-small" color="success" variant="tonal">
              Выполнено
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card v-else class="mt-6 text-center pa-8" elevation="2">
      <v-icon icon="mdi-chart-box-outline" size="80" color="grey-lighten-1" />
      <p class="text-h6 text-grey mt-4">
        ✨ Нет выполненных задач. Начни работать!
      </p>
    </v-card>

    <v-row justify="center" class="mt-6">
      <v-col cols="auto">
        <v-btn to="/" color="primary" prepend-icon="mdi-arrow-left" variant="outlined" size="large">
          К задачам
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const progress = computed(() => {
  if (store.getters.totalCount === 0) return 0
  return Math.round((store.getters.completedCount / store.getters.totalCount) * 100)
})
</script>
