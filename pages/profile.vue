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
            Beer venido
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
      <v-col v-for="recipe in recipes" :key="recipe.id" cols="sm">
        <v-card min-width="250">
          <v-img
            class="white--text align-end"
            :src="getFile(recipe.id)"
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

          <v-card-actions class="justify-center">
            <v-btn color="blue" :to="{path: '/recipe', query: recipe}">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="green" href="whatsapp://send?text=Essa cerveza es buenissima!">
              <v-icon>mdi-share</v-icon>
            </v-btn>

            <v-btn color="orange">
              <v-icon>mdi-eye</v-icon>
            </v-btn>

            <v-btn color="red" :to="{path: '/recipe', query: recipe}">
              <v-icon>mdi-delete</v-icon>
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
  data () {
    return {
      files: {}
    }
  },
  computed: {
    recipes () {
      return this.$store.getters['recipes/get']
    },
    email () {
      if (this.$fireAuth.currentUser) {
        return this.$fireAuth.currentUser.email
      } else {
        return 'No logado' // ir a la pagina de login
      }
    }
  },
  created () {
    this.getFromServer()
    for (const recipe of this.recipes) {
      const storageRef = this.$fireStorage.ref()
      const beerRef = storageRef.child(recipe.title.toLowerCase())
      beerRef.getDownloadURL()
        .then(url => this.getUrl(recipe.id, url))
        .catch(error => this.fakeUrl(recipe.id, error))
    }
  },
  mounted () {
    // eslint-disable-next-line dot-notation
    if (!this.$store.state.user) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('recipes', ['getFromServer']),
    update (recipe) {
      this.$router.push({ path: '/recipe', params: recipe })
    },
    getFile (id) {
      if (this.files) {
        return this.files[id]
      }
      return '/beer-bottle.svg'
    },
    getUrl (id, url) {
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function (event) {}
      xhr.open('GET', url)
      xhr.send()
      this.files[id] = url
    },
    fakeUrl (id, error) {
      this.files[id] = '/beer-bottle.svg'
    }
  }
}
</script>
