<template>
  <v-container>
    <v-row>
      <v-card width="100%" min-width="250">
        <v-col cols="">
          <v-avatar size="100">
            <img
              src="/drink.svg"
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

            <v-btn v-if="false" color="blue" text>
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
        <v-card>
          <v-img
            class="white--text align-end"
            :src="beer.image"
          />
          <v-icon class="ml-3 mt-2">
            mdi-glass-mug-variant
          </v-icon>
          <v-card-title>{{ beer.title }}</v-card-title>
          <v-card-subtitle class="pb-2 text--primary">
            IBU: {{ beer.ibu }}<br>
            Alcool: {{ beer.alcool }}<br>
            Stock: {{ beer.stock }}
          </v-card-subtitle>
          <v-card-text v-if="!beer.description" class="text--primary">
            Description:
            <p> {{ beer.description }} </p>
          </v-card-text>
          <v-expansion-panels :disabled="!beer.recipeValid">
            <v-expansion-panel>
              <v-expansion-panel-header color="grey" disable-icon-rotate>
                Recipe
                <template v-slot:actions>
                  <v-icon>mdi-chef-hat</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content color="grey">
                <v-card min-width="250">
                  <v-card-subtitle class="pb-2 text--primary">
                    Ingredient: {{ beer.recipe.ingredient1 }}<br>
                    Ingredient: {{ beer.recipe.ingredient2 }}<br>
                    Temperature: {{ beer.recipe.temperature }}<br>
                    Time: {{ beer.recipe.time }}
                  </v-card-subtitle>
                  <v-card-text v-if="beer.recipe.description !== ''" class="text--primary">
                    Description:
                    <div>{{ beer.recipe.description }}</div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
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
  mounted () {
    this.reset()
    this.getBeersFromServer()
    // eslint-disable-next-line dot-notation
    if (!this.$store.state.user) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('recipes', ['getFromServer']),
    ...mapActions('beers', ['getBeersFromServer', 'deleteBeerServer']),
    ...mapMutations('beers', ['reset']),
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
