<template>
  <div class="ui card github-profile">
    <div v-if="loading" class="content">
      <div class="description">Загрузка...</div>
    </div>
    <div v-else-if="error" class="content">
      <div class="description">{{ errorMessage }}</div>
    </div>
    <div v-else-if="profile" class="content">
      <div class="header">
        <img :src="profile.avatar_url" :alt="profile.login" class="avatar">
        <span class="name">{{ profile.name || profile.login }}</span>
      </div>
      <div class="meta">
        <span class="login">@{{ profile.login }}</span>
      </div>
      <div v-if="profile.bio" class="description">{{ profile.bio }}</div>
      <div class="description">
        Зарегистрирован: {{ formatDate(profile.created_at) }}
      </div>
      <div class="description">
        Подписчиков: {{ profile.followers }}
      </div>
      <div class="extra content">
        <a :href="profile.html_url" target="_blank" rel="noopener noreferrer">
          Перейти в профиль →
        </a>
      </div>
    </div>
  </div>
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
      errorMessage.value = response.status === 404 ? 'Пользователь не найден' : 'Ошибка загрузки'
      return
    }
    profile.value = await response.json()
  } catch {
    error.value = true
    errorMessage.value = 'Ошибка сети'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProfile)
</script>

<style scoped>
.github-profile {
  max-width: 350px;
  margin: 20px auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.github-profile:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.github-profile .header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 10px;
}

.github-profile .avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #f0f0f0;
}

.github-profile .name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.github-profile .meta {
  text-align: center;
  padding: 0 20px;
}

.github-profile .login {
  color: #666;
  font-size: 1rem;
}

.github-profile .description {
  padding: 8px 20px;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.5;
}

.github-profile .extra.content {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}

.github-profile .extra.content a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.github-profile .extra.content a:hover {
  color: #5a6fd6;
}
</style>
