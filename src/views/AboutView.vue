<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mx-auto" elevation="2">
          <v-card-title class="text-h5">
            <v-icon icon="mdi-information-outline" class="mr-2" />
            {{ $t('about.title') }}
          </v-card-title>

          <v-divider />

          <v-card-text>
            <p class="text-body-1 mb-4">
              {{ $t('about.description') }}
            </p>

            <v-alert type="info" variant="tonal" class="mb-4">
              <div class="d-flex align-center">
                <v-icon icon="mdi-star" class="mr-2" />
                <strong>{{ $t('about.goal') }}</strong>
              </div>
              <p class="mb-0 mt-2">
                {{ $t('about.goalDescription') }}
              </p>
            </v-alert>

            <v-card-subtitle class="text-h6 pt-4">
              <v-icon icon="mdi-layers" class="mr-2" />
              {{ $t('about.technologies') }}:
            </v-card-subtitle>

            <v-list density="compact" class="bg-transparent">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-vuejs" color="success" />
                </template>
                <v-list-title>{{ $t('about.techVue') }}</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-rocket-launch" color="primary" />
                </template>
                <v-list-title>{{ $t('about.techVite') }}</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-palette" color="secondary" />
                </template>
                <v-list-title>{{ $t('about.techVuetify') }}</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-sitemap" color="info" />
                </template>
                <v-list-title>{{ $t('about.techRouter') }}</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-storage" color="warning" />
                </template>
                <v-list-title>{{ $t('about.techStorage') }}</v-list-title>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-github" color="grey" />
                </template>
                <v-list-title>{{ $t('about.techGithub') }}</v-list-title>
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
                {{ $t('app.tasks') }}
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
