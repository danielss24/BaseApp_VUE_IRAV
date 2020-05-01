<template>
  <v-container>
    <v-row>
      <v-col cols="sm">
        <p class="display-1">
         Who are you? Who...
        </p>
        <p
          class="text-justify mb-5"
        >
         We are a group of students of the Univesidad Autonoma de Madrid (UAM), in home prison, learning about VueJS, nuxt and firebase (serveless) to do something new for the Internet and Advanced Network signature.
        </p>
        <div>
          <blockquote
            class="blockquote"
          >
            Think free as in free speech, not free beer. -- Richard Stallman
          </blockquote>
        </div>
      </v-col>
    </v-row>
    <v-row>
        <v-card class="mx-auto mb-2" max-width="400" v-for="(n, ix) in team" :key="ix" cols="sm">
          <v-img
            class="white--text align-center"
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
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      team: [
        { name: 'Maurilio Atila', position: 'Computer Scientist', email: 'maurilio.carvalho@estudiante.uam.com', image: '/mau-icon.jpg' },
        { name: 'Jim Dios Luna', position: 'Computer Scientist', email: 'jim.dios@estudiante.uam.es', image: '/jim-icon.jpg' },
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
