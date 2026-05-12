<template>
  <BasePage>
    <template #header>404</template>
    
    <div class="text-center py-16">
      <v-icon size="120" color="grey-lighten-1">mdi-alert-circle-outline</v-icon>
      
      <p class="text-h5 text-grey mt-4">{{ $t('notFound.title') }}</p>
      
      <p class="text-body-1 text-grey mt-2" style="max-width: 400px; margin: 0 auto;">
        {{ $t('notFound.goHome') }}
      </p>
      
      <v-btn color="primary" to="/" class="mt-6" size="large" prepend-icon="mdi-home">
        {{ $t('notFound.goHome') }}
      </v-btn>
    </div>
  </BasePage>
</template>

<script setup>
import BasePage from '../components/BasePage.vue'
</script>
