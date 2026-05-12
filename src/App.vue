<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-title class="text-white">
        <v-icon icon="mdi-checkbook" class="mr-2" />
        Список дел
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
          <span class="d-none d-md-inline">Задачи</span>
        </v-btn>

        <v-btn
          to="/stats"
          variant="text"
          color="white"
          prepend-icon="mdi-chart-bar"
          class="mx-1"
        >
          <span class="d-none d-md-inline">Статистика</span>
        </v-btn>

        <v-btn
          to="/profile"
          variant="text"
          color="white"
          prepend-icon="mdi-github"
          class="mx-1"
        >
          <span class="d-none d-md-inline">Профиль</span>
        </v-btn>

        <v-btn
          to="/about"
          variant="text"
          color="white"
          prepend-icon="mdi-information"
          class="mx-1"
        >
          <span class="d-none d-md-inline">О проекте</span>
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
            <span>© {{ new Date().getFullYear() }} - Кирилл Букарев | Производственная практика</span>
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

