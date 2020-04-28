<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ml-5">
      <p id="title" class="display-1" @mouseover="onMouse" @mouseleave="offMouse">
        + una Cerveza?
      </p>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="6">
        <file-upload ref="pic" />
        <v-container id="dropdown-beers-select">
          <v-row>
            <v-col cols="12" sm="4">
              <p>Beer</p>
              <v-overflow-btn
                v-model="recipe.title"
                class="my-2"
                :items="dropdown_beers"
                label="Beers"
                target="#dropdown-beers-select"
              />
            </v-col>
          </v-row>
        </v-container>
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
      buttom: 'Adicionar'
    }
  },
  computed: {
    beers () {
      return this.$store.getters['beers/get']
    }
  },
  created () {
    this.getBeersFromServer()
    console.log('BEEEEEEEERS', this.beers)
    this.dropdown_beers = []
    for (const beer of this.beers) {
      this.dropdown_beers.push(beer.title)
    }
    if (this.$route.query) {
      this.recipe = this.$route.query
      this.buttom = 'Actualizar'
    }
  },
  methods: {
    ...mapActions('recipe', ['post', 'update']),
    ...mapActions('beers', ['getBeersFromServer']),
    onMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza? <img height="50px" src="/felicidades.svg">'
      console.log('si o q', this.recipe.title)
    },
    offMouse () {
      document.getElementById('title').innerHTML = '+ una Cerveza?'
    },
    save () {
      // if (this.recipe.title) {
      //   this.$refs.pic.upload(this.recipe.title)
      //     .then(snapshot => this.callback(snapshot))
      // }
      this.callback('')
    },
    callback (snapshot) {
      if (this.recipe.id) {
        this.update(this.recipe)
        this.$router.push('/profile')
      } else {
        this.post(this.recipe)
        this.$router.push('/profile')
      }
    }
  }
}
</script>
