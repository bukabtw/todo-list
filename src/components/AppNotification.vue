<template>
  <div v-if="visible" class="notification-wrapper" :class="messageClass">
    <button class="close-button" @click="handleClose" aria-label="Закрыть">✕</button>
    <div class="icon"><span>{{ icon }}</span></div>
    <div class="content">{{ message }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'error'].includes(value)
  },
  visible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const messageClass = computed(() => `type-${props.type}`)

const icon = computed(() => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    error: '❌'
  }
  return icons[props.type] || icons.info
})

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.notification-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 400px;
  padding: 16px 48px 16px 20px;
  border-radius: 12px;
  border-left: 4px solid;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.4;
  color: #333;
  z-index: 9999;
  animation: slideInRight 0.4s ease-out forwards;
  background: white;
}

.notification-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  border-radius: 12px 0 0 12px;
}

@keyframes slideInRight {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-wrapperExiting {
  animation: slideOutRight 0.4s ease-in forwards;
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}

.type-info {
  background: #e7f3ff;
  border-left-color: #2185d0;
  color: #0c4a7a;
}

.type-info::before {
  background: #2185d0;
}

.type-success {
  background: #e6ffed;
  border-left-color: #21ba45;
  color: #0f5a1c;
}

.type-success::before {
  background: #21ba45;
}

.type-error {
  background: #fff0f0;
  border-left-color: #db2828;
  color: #7a1515;
}

.type-error::before {
  background: #db2828;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.6;
  transition: opacity 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 1.25rem;
  margin-right: 10px;
  flex-shrink: 0;
  display: inline-block;
}

.content {
  display: inline;
  vertical-align: middle;
}

@media (max-width: 480px) {
  .notification-wrapper {
    left: 10px;
    right: 10px;
    top: 10px;
    min-width: auto;
    max-width: none;
  }
}
</style>
