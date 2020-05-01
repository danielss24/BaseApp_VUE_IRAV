<template>
  <v-container>
    <v-row>
      <v-col v-for="(n, ix) in team" :key="ix" cols="sm">
        <v-card class="mx-auto" min-width="250">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="'https://picsum.photos/200/300/?random='+n"
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
        { name: 'Maurilio Atila', position: 'Computer Scientist', email: 'maurilio.carvalho@estudiante.uam.com' },
        { name: 'Jim Dios Luna', position: 'Computer Scientist', email: 'teste@teste.com' },
        { name: 'Daniel Serena', position: 'Computer Scientist', email: 'teste@teste.com' },
        { name: 'Juan Escalante', position: 'Computer Scientist', email: 'teste@teste.com' }

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
