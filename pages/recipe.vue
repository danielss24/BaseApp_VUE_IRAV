<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ml-5">
      <p id="title" class="display-1" @mouseover="onMouse" @mouseleave="offMouse">
        A new Recipe?
      </p>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-col cols="6">
            <v-select
              v-model="dropdown_beer"
              :items="beer_items"
              :rules="beerSelectRules"
              item-text="title"
              item-value="beerid"
              label="Select"
              return-object
              single-line
              required
            />
          </v-col>
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
        </v-form>
        <v-btn
          block
          color="success"
          dark
          @click="validate()"
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
      valid: true,
      beerSelectRules: [
        v => !!(v.title) || 'Beer is required'
      ],
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
    }
    if (this.$route.query) {
      this.recipe = this.$route.query
      this.buttom = 'Update'
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
      document.getElementById('title').innerHTML = 'A new Recipe? <img height="50px" src="/happiness.svg">'
    },
    offMouse () {
      document.getElementById('title').innerHTML = 'A new Recipe?'
    },
    save () {
      // if (this.recipe.title) {
      //   this.$refs.pic.upload(this.recipe.title)
      //     .then(snapshot => this.callback(snapshot))
      // }
      if (this.Beer == null) {
        this.callback('')
      }
    },
    validate () {
      this.$refs.form.validate()
      this.save()
    },
    callback (snapshot) {
      this.recipe.title = this.dropdown_beer.title
      this.recipe.beerid = this.dropdown_beer.beerid
      this.updateBeerRecipe(this.recipe)
      this.$router.push('/profile')
    }
  }
}
</script>
