<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-title class="text-white">
        <v-icon icon="mdi-checkbook" class="mr-2" />
        {{ $t('app.title') }}
      </v-app-bar-title>

      <v-spacer />

      <template v-slot:append>
        <v-btn
          to="/"
          variant="text"
          color="white"
          prepend-icon="mdi-check-circle"
          class="mx-1"
        >
          <span class="d-none d-md-inline">{{ $t('app.tasks') }}</span>
        </v-btn>

        <v-btn
          to="/stats"
          variant="text"
          color="white"
          prepend-icon="mdi-chart-bar"
          class="mx-1"
        >
          <span class="d-none d-md-inline">{{ $t('app.stats') }}</span>
        </v-btn>

        <v-btn
          to="/profile"
          variant="text"
          color="white"
          prepend-icon="mdi-github"
          class="mx-1"
        >
          <span class="d-none d-md-inline">{{ $t('app.profile') }}</span>
        </v-btn>

        <v-btn
          to="/about"
          variant="text"
          color="white"
          prepend-icon="mdi-information"
          class="mx-1"
        >
          <span class="d-none d-md-inline">{{ $t('app.about') }}</span>
        </v-btn>

        <v-btn
          @click="toggleLocale"
          size="small"
          class="ml-2"
          variant="tonal"
        >
          <v-icon icon="mdi-web" class="mr-1" />
          {{ currentLocale.toUpperCase() }}
        </v-btn>
      </template>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </v-main>

    <v-footer app color="primary" class="text-white">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center">
            <span>© {{ new Date().getFullYear() }} - {{ $t('app.footer') }}</span>
          </v-col>
          <v-col cols="12" class="text-center mt-2">
            <v-btn
              icon="mdi-github"
              href="https://github.com/bukabtw/todo-list"
              target="_blank"
              variant="text"
              color="white"
              size="small"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const toggleLocale = () => {
  locale.value = locale.value === 'ru' ? 'en' : 'ru'
  localStorage.setItem('app-locale', locale.value)
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

