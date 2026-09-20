<script setup>
import { ref } from "vue";

const cards = ref(["Today", "Yesterday"]);
</script>

<template>
  <v-container class="home-container py-4 py-sm-8 px-4 px-sm-6" fluid>
    <div class="page-heading mb-6">
      <div class="text-overline text-primary">Overview</div>
      <h1 class="text-h4 font-weight-medium">Dashboard</h1>
      <p class="text-body-2 text-medium-emphasis mt-1">查看儀錶板。</p>
    </div>

    <v-row>
      <v-col v-for="n in 3" :key="n" cols="12" sm="4">
        <v-card class="summary-card pa-4" variant="outlined">
          <div class="text-caption text-medium-emphasis">活動摘要 {{ n }}</div>
          <div class="text-h4 mt-2">—</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="card in cards" :key="card" cols="12" md="6">
        <v-card variant="outlined">
          <v-list>
            <v-list-subheader :title="card"></v-list-subheader>
            <v-list-item title="尚無活動紀錄" subtitle="目前沒有可顯示的內容。">
              <template #prepend>
                <v-icon color="primary">mdi-calendar-blank</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-container {
  max-width: 1440px;
  margin: 0 auto;
}

.summary-card {
  min-height: 116px;
}
</style>
