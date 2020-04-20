<template>
  <v-container>
    <v-row>
      <v-card width="100%" min-width="250">
        <v-col cols="">
          <v-avatar size="100">
            <img
              src="/mau-icon.jpg"
              alt="Maurilio Atila"
            >
          </v-avatar>
          <v-card-subtitle>
            Bien venido
          </v-card-subtitle>
          <v-card-title class="pt-0">
            {{ email }}
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange" text to="/recipe">
              + Recetas
            </v-btn>

            <v-btn color="blue" text>
              Atualizar el perfil
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-card>
    </v-row>
    <v-row class="mt-5">
      <v-col v-for="recipe in recipes" :key="recipe.title" cols="sm">
        <v-card min-width="250">
          <v-img
            class="white--text align-end"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          />

          <v-card-title>{{ recipe.title }}</v-card-title>

          <v-card-subtitle class="pb-0">
            IBU: {{ recipe.ibu }}
          </v-card-subtitle>
          <v-card-subtitle>
            Alcool: {{ recipe.alcool }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ recipe.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="green" href="whatsapp://send?text=Essa cerveza es buenissima!" text>
              Compartir
            </v-btn>

            <v-btn color="purple" text>
              Explorar
            </v-btn>

            <v-btn color="blue" text :to="{path: '/recipe', query: recipe}">
              Editar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    recipes () {
      return this.$store.getters['recipes/get']
    },
    email () {
      if (this.$fireAuth.currentUser) {
        return this.$fireAuth.currentUser.email
      } else {
        return 'no logado'
      }
    }
  },
  created () {
    this.getFromServer()

    if (this.$fireAuth.currentUser) {
      this.email = this.$fireAuth.currentUser.email
    }
  },
  methods: {
    ...mapActions('recipes', ['getFromServer']),
    update (recipe) {
      this.$router.push({ path: '/recipe', params: recipe })
    }
  }
}
</script>
