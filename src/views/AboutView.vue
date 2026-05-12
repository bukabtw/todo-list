<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mx-auto" elevation="2">
          <v-card-title class="text-h5">
            <v-icon icon="mdi-information-outline" class="mr-2" />
            О проекте "Список дел"
          </v-card-title>

          <v-divider />

          <v-card-text>
            <p class="text-body-1 mb-4">
              Этот проект создан в рамках производственной практики для демонстрации 
              современных веб-технологий и подходов к разработке.
            </p>

            <v-alert type="info" variant="tonal" class="mb-4">
              <div class="d-flex align-center">
                <v-icon icon="mdi-star" class="mr-2" />
                <strong>Цель проекта:</strong>
              </div>
              <p class="mb-0 mt-2">
                Изучение фреймворка Vue 3 и экосистемы инструментов для создания 
                интерактивных веб-приложений.
              </p>
            </v-alert>

            <v-card-subtitle class="text-h6 pt-4">
              <v-icon icon="mdi-layers" class="mr-2" />
              Использованные технологии:
            </v-card-subtitle>

            <v-list density="compact" class="bg-transparent">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-vuejs" color="success" />
                </template>
                <v-list-title>Vue 3 (Composition API)</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-rocket-launch" color="primary" />
                </template>
                <v-list-title>Vite - современный сборщик</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-palette" color="secondary" />
                </template>
                <v-list-title>Vuetify 3 - UI-библиотека</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-sitemap" color="info" />
                </template>
                <v-list-title>Vue Router 4 - роутинг</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-storage" color="warning" />
                </template>
                <v-list-title>localStorage - хранение данных</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-github" color="grey" />
                </template>
                <v-list-title>GitHub API - интеграция</v-list-title>
              </v-list-item>
            </v-list>

            <v-divider class="my-4" />

            <v-card-actions>
              <v-btn
                color="primary"
                to="/"
                prepend-icon="mdi-arrow-left"
                variant="outlined"
              >
                К задачам
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
