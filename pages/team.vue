<template>
  <v-container>
    <v-row>
      <v-col v-for="n in 5" :key="n" cols="sm">
        <v-card class="mx-auto" min-width="250">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="'https://picsum.photos/200/300/?random='+n"
          />

          <v-card-title>Miembro #{{ n }}</v-card-title>

          <v-card-subtitle class="pb-0">
            opa!
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>email</div>

            <div>twitter</div>
          </v-card-text>

          <v-card-actions v-if="false">
            <v-btn color="orange" text>
              Email
            </v-btn>

            <v-btn color="orange" text />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style>
 * {
     color: white;
 }
</style>
