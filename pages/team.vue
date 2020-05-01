<template>
  <v-container>
    <v-row>
      <v-col v-for="(n, ix) in team" :key="ix" cols="sm">
        <v-card class="mx-auto" min-width="250">
          <v-img
            class="white--text align-center"
            max-width="200"
            max-height="200"
            contain
            :src="n.image"
          />

          <v-card-title>{{ n.name }}</v-card-title>

          <v-card-subtitle class="pb-0">
            {{ n.position }}
          </v-card-subtitle>
          <v-card-actions v-if="true">
            <v-btn color="orange" :href="'mailto:'+n.email" text>
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
  data () {
    return {
      team: [
        { name: 'Maurilio Atila', position: 'Computer Scientist', email: 'maurilio.carvalho@estudiante.uam.com', image: '/mau-icon.jpg' },
        { name: 'Jim Dios Luna', position: 'Computer Scientist', email: 'jim.dios@estudiante.uam.es', image: '/jim-icon.png' },
        { name: 'Daniel Serena', position: 'Computer Scientist', email: 'daniel.serenas@estudiante.uam.es', image: '/dani-icon.png' },
        { name: 'Juan Escalante', position: 'Computer Scientist', email: 'juanandres.escalante@estudiante.uam.es', image: '/juan-icon.png' }
      ]
    }
  }
}
</script>

<style>
 * {
     color: white;
 }
</style>
