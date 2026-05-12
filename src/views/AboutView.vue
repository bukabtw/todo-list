<template>
  <BasePage>
    <template #header>{{ $t('about.title') }}</template>

    <BaseCard>
      <p>{{ $t('about.description') }}</p>
      <p class="font-weight-bold mt-4">{{ $t('about.technologies') }}:</p>
      <v-list density="compact">
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-vuejs" color="success" />
          </template>
          <v-list-item-title>Vue 3 (Composition API)</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-rocket-launch" color="primary" />
          </template>
          <v-list-item-title>Vite</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-palette" color="secondary" />
          </template>
          <v-list-item-title>Vuetify 3</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-sitemap" color="info" />
          </template>
          <v-list-item-title>Vue Router 4</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-storage" color="warning" />
          </template>
          <v-list-item-title>Vuex 4</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-translate" color="primary" />
          </template>
          <v-list-item-title>vue-i18n</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-hdd" color="grey" />
          </template>
          <v-list-item-title>localStorage</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-github" color="grey-darken-1" />
          </template>
          <v-list-item-title>GitHub API</v-list-item-title>
        </v-list-item>
      </v-list>
    </BaseCard>
  </BasePage>
</template>

<script setup>
import BasePage from '../components/BasePage.vue'
import BaseCard from '../components/BaseCard.vue'
</script>
