<script setup>
import { ref } from "vue";

const cards = ref(["Today", "Yesterday"]);
</script>

<template>
  <v-container class="py-8 px-6" fluid>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n">
        <v-card class="pa-2 ma-2" text="12"></v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="card in cards" :key="card" cols="12">
        <v-card>
          <v-list lines="two">
            <v-list-subheader :title="card"></v-list-subheader>

            <template v-for="n in 2" :key="n">
              <v-list-item title="Lorem ipsum" :subtitle="`Bello ${n}`">
                <template #prepend>
                  <v-avatar color="grey-darken-1"></v-avatar>
                </template>
              </v-list-item>

              <v-divider v-if="n !== 2" :key="`divider-${n}`" inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
