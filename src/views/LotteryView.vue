<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list lines="two">
            <v-list-subheader title="card"></v-list-subheader>

            <template v-for="n in 2" :key="n">
              <v-list-item title="Lorem ipsum" :subtitle="`Bello ${n}`">
                <template v-slot:prepend>
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
  <v-fab class="me-4 add-lottery" icon="mdi-plus" color="primary" location="bottom end" offset></v-fab>
</template>

<style scoped>
.add-lottery {
  position: fixed;
  bottom: 120px;
  right: 80px;
}
</style>
