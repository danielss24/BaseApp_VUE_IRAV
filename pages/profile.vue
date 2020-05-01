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
            Beer venido / Welcome
          </v-card-subtitle>
          <v-card-title class="pt-0">
            {{ email }}
          </v-card-title>
          <v-card-actions>
            <v-btn color="orange" text to="/recipe">
              +Recipe
            </v-btn>
            <v-btn color="yellow" text to="/beer">
              +Beer
            </v-btn>

            <v-btn color="blue" text>
              Update Profile
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-card>
    </v-row>
    <v-card-title v-if="!beers" style="display:block">
      BEERS
    </v-card-title>
    <v-row class="mt-5">
      <v-col v-for="(beer, index) in beers" :key="index" cols="sm">
        <v-card min-width="250">
          <v-img
            class="white--text align-end"
            :src="beer.image"
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
            Description:
            <p> {{ beer.description }} </p>
          </v-card-text>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header color="grey" disable-icon-rotate>
                Recipe
                <template v-slot:actions>
                  <v-icon>mdi-chef-hat</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content color="grey">
                <v-card min-width="250">
                  <v-card-subtitle class="pb-0">
                    Ingredient: {{ beer.recipe.ingredient1 }}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    Ingredient: {{ beer.recipe.ingredient2 }}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    Temperature: {{ beer.recipe.temperature }}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    Time: {{ beer.recipe.time }}
                  </v-card-subtitle>
                  <v-card-text class="text--primary">
                    Description:
                    <div>{{ beer.recipe.description }}</div>
                  </v-card-text>
                </v-card>
                <v-btn color="orange" :to="{path: '/recipe', query: beer.recipe}">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-card-actions class="justify-center">
            <v-btn color="blue" :to="{path: '/beer', query: beer}">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="green" href="">
              <v-icon>mdi-share</v-icon>
            </v-btn>
            <v-btn color="red" @click="deleteBeer(beer)">
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
  },
  mounted () {
    // eslint-disable-next-line dot-notation
    if (!this.$store.state.user) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('recipes', ['getFromServer']),
    ...mapActions('beers', ['getBeersFromServer', 'deleteBeerServer']),
    update (recipe) {
      this.$router.push({ path: '/recipe', params: recipe })
    },
    fakeUrl (id, error) {
      this.files[id] = '/beer-bottle.svg'
    },
    deleteBeer (beer) {
      this.deleteBeerServer(beer)
    }
  }
}
</script>
