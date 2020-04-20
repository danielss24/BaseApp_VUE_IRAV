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
          Como funciona?
        </p>
        <p
          class="text-justify mb-5"
        >
          El sistema es muy simple, si produce cerveza, puede agregar la receta de su cerveza, otras personas que vienen aquí pueden contactarlo para varias cosas, una de ellas es intercambiar cerveza, enviar algunas botellas de la cerveza que ella hace y usted envía otros, por supuesto, puede estar dando cerveza, pero no hay cerveza gratis ...
        </p>
        <div v-if="false">
          <!-- TODO: improve the blockquote design -->
          <blockquote class="blockquote">
            3 deseos: salud, dinero y amor...
          </blockquote>
          <blockquote
            class="blockquote"
          >
            AMOR por la CERVEZA, DINERO para comprarla y SALUD para beberla -- Homer Simpson
          </blockquote>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="sm">
        <v-toolbar dark color="teal">
          <v-toolbar-title>Barra libre</v-toolbar-title>
          <!-- TODO: we can alternate the words above: Cervecera -->
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
            label="Escribe algo sobre la cerveza que estas buscando?"
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
