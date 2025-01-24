<script setup lang="ts">
import router from "@/router";
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>Lottery</v-app-bar-title>
    <template v-slot:append>
      <v-btn prepend-icon="mdi-plus" @click="router.push({ name: 'LotteryCreate' })">Add</v-btn>
    </template>
  </v-app-bar>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list>
            <v-list-subheader title="進行中"></v-list-subheader>
            <template v-for="n in 2" :key="n">
              <v-list-item lines="three">
                <template v-slot:prepend>
                  <v-avatar color="grey-darken-1">尚未</v-avatar>
                  <v-avatar color="grey-lighten-2">開獎</v-avatar>
                </template>
                <template v-slot:title>The title</template>
                <template v-slot:subtitle>
                  2025-01-01 ~ 2025-01-31 | The award...(cut)
                  <br />
                  公布日期: 2025-01-31
                </template>
              </v-list-item>
              <v-divider v-if="n !== 2" :key="`divider-${n}`" inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-expansion-panels>
            <v-expansion-panel title="歷史紀錄">
              <template v-slot:text>
                <template v-for="n in 2" :key="n">
                  <v-list-item lines="three">
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-3">未中</v-avatar>
                      <v-avatar color="grey-lighten-4">中獎</v-avatar>
                    </template>
                    <template v-slot:title>The title</template>
                    <template v-slot:subtitle>
                      2025-01-01 ~ 2025-01-31 | The award...(cut)
                      <br />
                      公布日期: 2025-01-31
                    </template>
                  </v-list-item>
                  <v-divider v-if="n !== 2" :key="`divider-${n}`" inset></v-divider>
                </template>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.add-lottery {
  position: fixed;
  bottom: 120px;
  right: 80px;
}
</style>
