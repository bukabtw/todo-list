<template>
  <v-container class="text-center py-16">
    <v-icon size="120" color="grey-lighten-1">mdi-alert-circle-outline</v-icon>
    
    <h1 class="text-h2 mt-4 text-grey">404</h1>
    
    <p class="text-h5 text-grey mt-2">{{ $t('notFound.title') }}</p>
    
    <p class="text-body-1 text-grey mt-4" style="max-width: 400px; margin: 0 auto;">
      {{ $t('notFound.goHome') }}
    </p>
    
    <v-btn color="primary" to="/" class="mt-6" size="large" prepend-icon="mdi-home">
      {{ $t('notFound.goHome') }}
    </v-btn>
  </v-container>
</template>

<script setup>
</script>
