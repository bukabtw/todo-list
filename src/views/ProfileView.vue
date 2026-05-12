<template>
  <BasePage>
    <template #header>{{ $t('app.profile') }}</template>
    <GithubProfile username="bukabtw" />
  </BasePage>
</template>

<script setup>
import BasePage from '../components/BasePage.vue'
import GithubProfile from '../components/GithubProfile.vue'
</script>
