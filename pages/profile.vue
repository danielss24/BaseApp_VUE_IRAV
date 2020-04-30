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
    <v-card-title style="display:block">
      BEERS
    </v-card-title>
    <v-row class="mt-5">
      <v-col v-for="beer in beers" :key="beer.id" cols="sm">
        <v-card min-width="250">
          <v-img
            class="white--text align-end"
            :src="getFile(beer.id)"
          />
          <v-icon>mdi-glass-mug-variant</v-icon>
          <v-card-title>{{ beer.title }}</v-card-title>
          <v-card-subtitle class="pb-0">
            IBU: {{ beer.ibu }}
          </v-card-subtitle>
          <v-card-subtitle>
            Alcool: {{ beer.alcool }}
          </v-card-subtitle>
          <v-card-subtitle>
            Stock: {{ beer.stock }}
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>{{ beer.description }}</div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="blue" :to="{path: '/beer', query: beer}">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="green" href="">
              <v-icon>mdi-share</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" width="600px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="orange"
                  dark
                  v-on="on"
                >
                  <v-icon
                    v-on="on"
                  >
                    mdi-eye
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  class="headline grey"
                  primary-title
                >
                  Recipe
                </v-card-title>
                <v-row class="mt-5">
                  <v-card min-width="250">
                    <!-- <v-img
                      class="white--text align-end"
                      :src="getFile(beer.recipe.title)"
                    /> -->
                    <!-- <v-card-title>{{ beer.recipe.title }}</v-card-title> -->
                    <v-card-subtitle class="pb-0">
                      ingredient1: {{ beer.recipe.ingredient1 }}
                    </v-card-subtitle>
                    <v-card-subtitle>
                      ingredient2: {{ beer.recipe.ingredient2 }}
                    </v-card-subtitle>
                    <v-card-subtitle>
                      temperature: {{ beer.recipe.temperature }}
                    </v-card-subtitle>
                    <v-card-subtitle>
                      time: {{ beer.recipe.time }}
                    </v-card-subtitle>
                    <v-card-text class="text--primary">
                      <div>{{ beer.recipe.description }}</div>
                    </v-card-text>
                  </v-card>
                </v-row>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Exit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn color="red" :to="{path: '/beer', query: beer}">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row class="mt-5">
      <v-col v-for="recipe in recipes" :key="recipe.id" cols="sm">
        <v-card min-width="250">
          <v-icon>mdi-chef-hat</v-icon>
          <v-card-title>RECIPE</v-card-title>
          <v-img
            class="white--text align-end"
            :src="getFile(recipe.id)"
          />

          <v-card-title>{{ recipe.title }}</v-card-title>

          <v-card-subtitle class="pb-0">
            ingredient1: {{ recipe.ingredient1 }}
          </v-card-subtitle>
          <v-card-subtitle>
            ingredient2: {{ recipe.ingredient2 }}
          </v-card-subtitle>
          <v-card-subtitle>
            ingredient2: {{ recipe.temperature }}
          </v-card-subtitle>
          <v-card-subtitle>
            time: {{ recipe.time }}
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
    </v-row> -->
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      files: {},
      dialog: false
    }
  },
  computed: {
    beers () {
      const beers = this.$store.getters['beers/get']
      return beers
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
    this.getBeersFromServer()
    console.log('Beers', this.beers)
  },
  mounted () {
    // eslint-disable-next-line dot-notation
    if (!this.$store.state.user) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('recipes', ['getFromServer']),
    ...mapActions('beers', ['getBeersFromServer']),
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
    // openBeerDialog (beera) {
    //   console.log('das', beera.recipe)
    //   this.beer.recipe = beera.recipe
    //   console.log('Abre', beera)
    // }
  }
}
</script>
