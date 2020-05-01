<template>
  <v-container>
    <v-row v-if="false">
      <v-col cols="sm">
        <p>banner</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="sm">
        <p class="display-1">
          How it works?
        </p>
        <p
          class="text-justify mb-5"
        >
          The system is very simple, if you produce beer, you can add your beer recipe, other people who come here can contact you for various things, one of them is to exchange beer, send some bottles of the beer that she makes and you send others, of course it may be giving beer, but there is no free beer ...
        </p>
        <div>
          <blockquote
            class="blockquote"
          >
            LOVE for the BEER, MONEY to buy it and HEALTH to drink it -- Homer Simpson
          </blockquote>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="sm">
        <v-toolbar v-if="false" dark color="teal">
          <v-toolbar-title>open Bar</v-toolbar-title>
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-4"
            flat
            hide-no-data
            hide-details
            label="search a beer..."
            solo-inverted
          />
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
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
    }
  },
  mounted () {
    this.reset()
    this.getBeersFromServer()
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
