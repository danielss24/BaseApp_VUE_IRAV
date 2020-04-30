/* eslint-disable vue/html-self-closing */
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
        <div v-if="true">
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
        <v-toolbar dark color="teal">
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
    <v-row class="mt-5">
      <v-col v-for="recipe in recipes" :key="recipe.title" cols="sm">
        <v-card min-width="250">
          <v-img
            class="white--text align-end"
            src="/beer-bottle.svg"
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
            <v-btn color="orange" text>
              Share
            </v-btn>

            <v-btn color="orange" text>
              Explore
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
      items: [],
      loading: '',
      recipes: [],
      search: '',
      select: ''
    }
  },
  created () {
    this.recipes = this.$store.getters['recipes/get']
  },
  methods: {
    ...mapActions('recipes', ['getFromServer'])
  }
}
</script>

<style></style>
