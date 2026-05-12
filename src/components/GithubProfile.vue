<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-text v-if="loading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary" size="64" />
      <p class="text-grey mt-4">Загрузка...</p>
    </v-card-text>

    <v-alert v-else-if="error" type="error" variant="tonal" class="ma-4">
      <div class="d-flex align-center">
        <v-icon icon="mdi-alert-circle" class="mr-2" />
        {{ errorMessage }}
      </div>
    </v-alert>

    <v-card-text v-else-if="profile">
      <v-card-item class="pa-0">
        <div class="d-flex align-center flex-column text-center">
          <v-avatar size="120" class="mb-3">
            <v-img :src="profile.avatar_url" :alt="profile.login" />
          </v-avatar>

          <v-card-title class="justify-center">
            {{ profile.name || profile.login }}
          </v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-account" size="small" class="mr-1" />
            @{{ profile.login }}
          </v-card-subtitle>
        </div>
      </v-card-item>

      <v-card-text v-if="profile.bio">
        <v-icon icon="mdi-text" size="small" class="mr-1" />
        {{ profile.bio }}
      </v-card-text>

      <v-card-text>
        <v-row dense>
          <v-col cols="6">
            <div class="text-h6 font-weight-bold">
              <v-icon icon="mdi-account-group" size="small" class="mr-1" />
              {{ profile.followers }}
            </div>
            <div class="text-caption text-grey">Подписчиков</div>
          </v-col>
          <v-col cols="6">
            <div class="text-h6 font-weight-bold">
              <v-icon icon="mdi-calendar" size="small" class="mr-1" />
              {{ formatDate(profile.created_at) }}
            </div>
            <div class="text-caption text-grey">Дата регистрации</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          variant="outlined"
          color="primary"
          :href="profile.html_url"
          target="_blank"
          rel="noopener noreferrer"
          append-icon="mdi-open-in-new"
        >
          Перейти в профиль
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true,
    validator: (value) => value.length > 0
  }
})

const profile = ref(null)
const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchProfile = async () => {
  loading.value = true
  error.value = false
  try {
    const response = await fetch(`https://api.github.com/users/${props.username}`)
    if (!response.ok) {
      error.value = true
      errorMessage.value = response.status === 404 
        ? 'Пользователь не найден' 
        : 'Ошибка загрузки профиля'
      return
    }
    profile.value = await response.json()
  } catch {
    error.value = true
    errorMessage.value = 'Ошибка сети. Проверьте подключение.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfile)
</script>

<style scoped>
.v-card {
  border-radius: 12px !important;
}

.v-avatar {
  border: 3px solid #667eea;
}
</style>
