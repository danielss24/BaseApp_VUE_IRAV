<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ml-5">
      <p id="title" class="display-1" @mouseover="onMouse" @mouseleave="offMouse">
        + una Cerveza?
      </p>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="6">
        <v-col cols="6">
          <v-select
            v-model="dropdown_beer"
            :items="beer_items"
            item-text="title"
            item-value="beerid"
            label="Select"
            return-object
            single-line
          />
        </v-col>

        <!-- <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="recipe.title"
            :items="beer_items"
            :values="beer_values"
            label="Beers"
            solo
          />
        </v-col> -->

        <v-text-field
          v-model="recipe.ingredient1"
          label="Ingredient 1"
          placeholder="Barley"
          outlined
        />
        <v-text-field
          v-model="recipe.ingredient2"
          label="Ingredient 2"
          placeholder="Water"
          outlined
        />
        <v-text-field
          v-model="recipe.temperature"
          label="Temperature"
          placeholder="º C"
          outlined
        />
        <v-text-field
          v-model="recipe.time"
          label="Time"
          placeholder="days hours"
          outlined
        />
        <v-textarea
          v-model="recipe.description"
          label="Description"
          placeholder="Tell about the process ... "
          outlined
        />
        <file-upload ref="pic" />
        <br>
        <v-btn
          block
          color="success"
          dark
          @click="save()"
        >
          {{ buttom }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import FileUpload from '../components/FileUpload'

export default {
  components: {
    FileUpload
  },
  data () {
    return {
      recipe: {
        title: '',
        beer_id: '',
        ingredient1: '',
        ingredient2: '',
        temperature: '',
        time: '',
        description: ''
      },
      buttom: 'Adicionar',
      dropdown_beer: { name: 'Beers', id: '-1' },
      beer_items: []
    }
  },
  computed: {
    beers () {
      return this.$store.getters['beers/get']
    }
  },
  created () {
    this.getBeersFromServer()
    for (const beer of this.beers) {
      this.beer_items.push({ title: beer.title, beerid: beer.id })
      console.log('beer items', this.beer_items)
    }
    if (this.$route.query) {
      this.recipe = this.$route.query
      this.buttom = 'Actualizar'
    }
  },
  mounted () {
    // eslint-disable-next-line dot-notation
    const isLoggedIn = this.$store.getters['isLoggedIn']
    if (!isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('recipe', ['post', 'update', 'updateBeerRecipe']),
    ...mapActions('beers', ['getBeersFromServer']),
    onMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza? <img height="50px" src="/felicidades.svg">'
      console.log('Recipe is', this.recipe)
      console.log('Recipe is', this.dropdown_beer.title)
      console.log('Recipe is', this.dropdown_beer.beerid)
    },
    offMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza?'
    },
    save () {
      // if (this.recipe.title) {
      //   this.$refs.pic.upload(this.recipe.title)
      //     .then(snapshot => this.callback(snapshot))
      // }
      console.log(this.Beer)
      this.callback('')
    },
    loadBeerId () {
      console.log('wait')
    },
    callback (snapshot) {
      this.recipe.title = this.dropdown_beer.title
      this.recipe.beerid = this.dropdown_beer.beerid
      this.updateBeerRecipe(this.recipe)
      // if (this.recipe.id) {
      //   this.update(this.recipe)
      //   this.$router.push('/profile')
      // } else {
      //   this.post(this.recipe)
      //   this.$router.push('/profile')
      // }
    }
  }
}
</script>
