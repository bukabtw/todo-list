<template>
  <BasePage>
    <template #header>
      <v-icon icon="mdi-chart-bar" class="mr-2" />
      {{ $t('stats.title') }}
    </template>

    <v-row>
      <v-col cols="12" md="4">
        <BaseStatCard
          color="primary"
          icon="mdi-check-circle"
          :value="store.getters.completedCount"
        >
          <template #label>{{ $t('stats.completed') }}</template>
        </BaseStatCard>
      </v-col>

      <v-col cols="12" md="4">
        <BaseStatCard
          color="warning"
          icon="mdi-progress-clock"
          :value="store.getters.pendingCount"
        >
          <template #label>{{ $t('stats.pending') }}</template>
        </BaseStatCard>
      </v-col>

      <v-col cols="12" md="4">
        <BaseStatCard
          color="info"
          icon="mdi-list-box"
          :value="store.getters.totalCount"
        >
          <template #label>{{ $t('stats.total') }}</template>
        </BaseStatCard>
      </v-col>
    </v-row>

    <BaseCard :title="$t('stats.progress')">
      <v-progress-linear
        :model-value="progress"
        color="primary"
        height="25"
        rounded
      >
        <template v-slot:default>
          <span class="text-white font-weight-bold">{{ progress }}%</span>
        </template>
      </v-progress-linear>
    </BaseCard>

    <BaseCard v-if="store.getters.completedCount > 0" :title="$t('stats.completedList')">
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
              {{ $t('tasks.completed') }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </BaseCard>

    <BaseCard v-else>
      <template #title>
        <v-icon icon="mdi-chart-box-outline" class="mr-2" color="grey" />
        {{ $t('stats.completedList') }}
      </template>
      <div class="text-center py-8">
        <v-icon icon="mdi-clipboard-text-outline" size="64" color="grey-lighten-1" />
        <p class="text-h6 text-grey mt-4">
          ✨ {{ $t('stats.noTasks') }}
        </p>
      </div>
    </BaseCard>
  </BasePage>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BasePage from '../components/BasePage.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseList from '../components/BaseList.vue'
import BaseStatCard from '../components/BaseStatCard.vue'

const store = useStore()

const progress = computed(() => {
  if (store.getters.totalCount === 0) return 0
  return Math.round((store.getters.completedCount / store.getters.totalCount) * 100)
})
</script>
