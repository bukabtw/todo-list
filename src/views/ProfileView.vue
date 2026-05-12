<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <div class="text-h5 text-center mb-6">
          <v-icon icon="mdi-github" class="mr-2" />
          Профиль разработчика
        </div>
        
        <GithubProfile username="bukabtw" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import GithubProfile from '../components/GithubProfile.vue'
</script>
